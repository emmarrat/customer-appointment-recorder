import express from 'express';
import ServiceHour from '../models/ServiceHour';
import mongoose from 'mongoose';
import Appointment from '../models/Appointment';
import auth, { RequestWithUser } from '../middleware/auth';
import nodemailer from 'nodemailer';
import { AppointmentFull } from '../types';
import constants from '../constants';
import permit from '../middleware/permit';

const appointmentsRouter = express.Router();

const sendEmail = async (email: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
      user: process.env.VERIFY_EMAIL_USER,
      pass: process.env.VERIFY_EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Strategia School" <do-not-reply@strategia.school>`,
    to: email,
    subject: subject,
    html: html,
  };

  await transporter.sendMail(mailOptions);
};

appointmentsRouter.post('/', auth, async (req, res, next) => {
  try {
    const { expert, service, date, startTime, endTime } = req.body;
    const user = (req as RequestWithUser).user;

    const serviceHour = await ServiceHour.findOne({
      _id: date,
      hours: { $elemMatch: { startTime, endTime, status: false } },
    });

    if (!serviceHour) {
      return res.status(400).send({ error: 'Указанный день уже занят' });
    }

    const appointment = new Appointment({
      client: user._id,
      expert,
      service,
      date,
      startTime,
      endTime,
    });

    await appointment.save();

    return res.send({
      message: 'Запись успешно создана!',
      appointment,
    });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

appointmentsRouter.get('/', auth, async (req, res, next) => {
  const { expert, client, page, limit } = req.query;
  const user = (req as RequestWithUser).user;

  const currentPage: number = parseInt(page as string) || 1;
  const itemsPerPage: number = parseInt(limit as string) || 10;

  try {
    let appointments;
    let totalAppointments: number;

    const skip: number = (currentPage - 1) * itemsPerPage;

    if (expert && user.role === 'expert') {
      appointments = await Appointment.find({ expert })
        .populate({
          path: 'client',
          select: 'firstName lastName email',
        })
        .populate({
          path: 'expert',
          select: '_id title',
          populate: {
            path: 'user',
            select: 'firstName lastName',
          },
        })
        .populate({
          path: 'date',
          select: 'date',
        })
        .sort({ createdAt: 1 })
        .skip(skip)
        .limit(itemsPerPage);

      totalAppointments = await Appointment.countDocuments({ expert });

      return res.send({
        message: 'Записи данного эксперта',
        result: { appointments, currentPage, totalCount: totalAppointments },
      });
    }

    if (client && user.role === 'user') {
      appointments = await Appointment.find({ client })
        .populate({
          path: 'client',
          select: 'firstName lastName email',
        })
        .populate({
          path: 'expert',
          select: '_id title',
          populate: {
            path: 'user',
            select: 'firstName lastName',
          },
        })
        .populate({
          path: 'date',
          select: 'date',
        })
        .sort({ createdAt: 1 })

        .skip(skip)
        .limit(itemsPerPage);

      totalAppointments = await Appointment.countDocuments({ client });

      return res.send({
        message: 'Записи данного пользователя',
        result: { appointments, currentPage, totalCount: totalAppointments },
      });
    }

    if (user.role === 'admin') {
      appointments = await Appointment.find()
        .populate({
          path: 'client',
          select: 'firstName lastName email',
        })
        .populate({
          path: 'expert',
          select: '_id title',
          populate: {
            path: 'user',
            select: 'firstName lastName',
          },
        })
        .populate({
          path: 'date',
          select: 'date',
        })
        .sort({ createdAt: 1 })
        .skip(skip)
        .limit(itemsPerPage);

      totalAppointments = await Appointment.countDocuments();

      return res.send({
        message: 'Все записи',
        result: { appointments, currentPage, totalCount: totalAppointments },
      });
    }

    return res.status(400).send({ error: 'Записи не найдены' });
  } catch (e) {
    return next(e);
  }
});

appointmentsRouter.patch(
  '/:id',
  auth,
  permit('admin'),
  async (req, res, next) => {
    const { id } = req.params;
    const { isApproved } = req.body;

    try {
      const appointment: AppointmentFull | null = await Appointment.findById(id)
        .populate({
          path: 'client',
          select: 'firstName lastName email',
        })
        .populate({
          path: 'expert',
          select: '_id title',
          populate: {
            path: 'user',
            select: 'firstName lastName',
          },
        })
        .populate({
          path: 'date',
          select: 'date',
        });

      const appointmentToSave = await Appointment.findById(id);

      if (!appointment || !appointmentToSave) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
      appointmentToSave.isApproved = isApproved;
      await appointmentToSave.save();

      await ServiceHour.updateOne(
        { _id: appointment.date._id, 'hours.startTime': appointment.startTime },
        { $set: { 'hours.$.status': isApproved } },
      );

      await sendEmail(
        appointment.client.email,
        isApproved ? 'Подтверджение записи' : 'Отмена записи',
        isApproved
          ? constants.APPOINTMENT_APPROVAL_EMAIL(
              appointment.client.firstName,
              appointment.date.date,
              appointment.startTime,
              appointment.service.name,
              appointment.expert.user.firstName,
            )
          : constants.APPOINTMENT_REJECTION_EMAIL(
              appointment.client.firstName,
              appointment.date.date,
              appointment.startTime,
              appointment.service.name,
              appointment.expert.user.firstName,
            ),
      );

      return res.send({
        message: 'Статус записи успешно изменен!',
        appointmentToSave,
      });
    } catch (e) {
      return next(e);
    }
  },
);

export default appointmentsRouter;
