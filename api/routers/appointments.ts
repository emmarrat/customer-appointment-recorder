import express from "express";
import ServiceHour from "../models/ServiceHour";
import mongoose from "mongoose";
import Appointment from "../models/Appointment";
import auth, { RequestWithUser } from "../middleware/auth";

const appointmentsRouter = express.Router();

appointmentsRouter.post("/", auth, async (req, res, next) => {
  try {
    const { expert, service, date, startTime, endTime } = req.body;
    const user = (req as RequestWithUser).user;

    const serviceHour = await ServiceHour.findOne({
      _id: date,
      hours: { $elemMatch: { startTime, endTime, status: false } },
    });

    if (!serviceHour) {
      return res.status(400).send({ error: "Указанный день уже занят" });
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

    await ServiceHour.updateOne(
      { _id: date, "hours.startTime": startTime },
      { $set: { "hours.$.status": true } }
    );

    return res.send({
      message: "Запись успешно создана!",
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

appointmentsRouter.get("/", auth, async (req, res) => {
  const { expert, client, page, limit } = req.query;
  const user = (req as RequestWithUser).user;

  const currentPage: number = parseInt(page as string) || 1;
  const itemsPerPage: number = parseInt(limit as string) || 10;

  try {
    let appointments;
    let totalAppointments: number;

    const skip: number = (currentPage - 1) * itemsPerPage;

    if (expert && user.role === "expert") {
      appointments = await Appointment.find({ expert })
        .populate({
          path: "client",
          select: "firstName lastName email",
        })
        .populate({
          path: "expert",
          select: "_id title",
          populate: {
            path: "user",
            select: "firstName lastName",
          },
        })
        .populate({
          path: "date",
          select: "date",
        })
        .skip(skip)
        .limit(itemsPerPage);

      totalAppointments = await Appointment.countDocuments({ expert });

      return res.send({
        message: "Записи данного эксперта",
        result: { appointments, currentPage, totalCount: totalAppointments },
      });
    }

    if (client && user.role === "user") {
      appointments = await Appointment.find({ client })
        .populate({
          path: "client",
          select: "firstName lastName email",
        })
        .populate({
          path: "expert",
          select: "_id title",
          populate: {
            path: "user",
            select: "firstName lastName",
          },
        })
        .populate({
          path: "date",
          select: "date",
        })
        .skip(skip)
        .limit(itemsPerPage);

      totalAppointments = await Appointment.countDocuments({ client });

      return res.send({
        message: "Записи данного пользователя",
        result: { appointments, currentPage, totalCount: totalAppointments },
      });
    }

    if (user.role === "admin") {
      appointments = await Appointment.find()
        .populate({
          path: "client",
          select: "firstName lastName email",
        })
        .populate({
          path: "expert",
          select: "_id title",
          populate: {
            path: "user",
            select: "firstName lastName",
          },
        })
        .populate({
          path: "date",
          select: "date",
        })
        .skip(skip)
        .limit(itemsPerPage);

      // Count the total number of appointments
      totalAppointments = await Appointment.countDocuments();

      return res.send({
        message: "Все записи",
        result: { appointments, currentPage, totalCount: totalAppointments },
      });
    }

    return res.status(400).send({ error: "Записи не найдены" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving appointments." });
  }
});

export default appointmentsRouter;
