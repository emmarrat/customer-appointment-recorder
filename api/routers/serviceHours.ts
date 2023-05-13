import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import Expert from "../models/Expert";
import mongoose from "mongoose";
import ServicesHour from "../models/ServiceHour";
import ServiceHour from "../models/ServiceHour";

const serviceHoursRouter = express.Router();

serviceHoursRouter.post(
  '/',
  auth,
  permit('expert'),

  async (req, res, next) => {
    try {
      const existingExpert = await Expert.findById(req.body.expert);
      if (!existingExpert) {
        return res.status(400).send({error: 'Мастер не найден!'});
      }

      const user = (req as RequestWithUser).user;

      if (user._id.toString() !== existingExpert.user.toString()) {
        return res.status(400).send({error: 'У пользователя не достаточно прав!'});
      }

      const existingService = await ServiceHour.findOne({date: req.body.date});

      if (existingService) {
        return res.status(400).send({error: 'У данного мастера уже есть рабочий график на этот день!'});
      }

      const newServicesHour = new ServicesHour({
        expert: req.body.expert,
        date: req.body.date,
      });

      newServicesHour.hours = [
        {startTime: '10:00', endTime: '11:00', status: false},
        {startTime: '11:15', endTime: '12:15', status: false},
        {startTime: '13:45', endTime: '14:45', status: false},
        {startTime: '15:00', endTime: '16:00', status: false},
        {startTime: '16:15', endTime: '17:15', status: false},
        {startTime: '17:30', endTime: '18:30', status: false},
      ];

      const savedServicesHour = await newServicesHour.save();

      res.status(200).send({message: 'working schedule successfully created', serviceHours: savedServicesHour});

    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      } else {
        return next(e);
      }
    }
  },
);

serviceHoursRouter.get('/expert/:id', async (req, res, next) => {
  try {
    const serviceHours = await ServicesHour.find({expert: req.params.id}).exec();

    res.status(200).send(serviceHours);
  } catch (e) {
    return next(e);
  }
});

serviceHoursRouter.get('/by-user/:id', async (req, res, next) => {
  try {
    const expert = await Expert.findOne({user: req.params.id}).populate('user', 'firstName lastName');

    if (!expert) {
      return res.status(404).send({error: 'Мастер не найден!'});
    }

    const serviceHours = await ServicesHour.find({expert: expert._id}).exec();

    return res.send(serviceHours);

  } catch (e) {
    return next(e);
  }
})

serviceHoursRouter.patch(
  '/:id/hours',
  auth,
  permit('expert'),

  async (req, res, next) => {
    try {
      const serviceHour = await ServicesHour.findById(req.params.id);
      if (!serviceHour) {
        return res.status(404).send({error: 'Service hour not found!'});
      }

      const existingExpert = await Expert.findById(serviceHour.expert);
      if (!existingExpert) {
        return res.status(500).send({error: 'Expert not found!'});
      }

      const user = (req as RequestWithUser).user;
      if (user._id.toString() !== existingExpert.user.toString()) {
        return res.status(500).send({error: 'This user do not have enough access!'});
      }

      serviceHour.hours = req.body.hours;
      const savedServiceHour = await serviceHour.save();

      res.status(200).send({message: 'working hours successfully updated', serviceHours: savedServiceHour});

    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      } else {
        return next(e);
      }
    }
  },
);

serviceHoursRouter.delete(
  '/:id',
  auth,
  permit('expert', 'admin'),
  async (req, res, next) => {
    try {
      const serviceHour = await ServicesHour.findById(req.params.id);
      if (!serviceHour) {
        return res.status(404).send({error: 'Service hour not found!'});
      }

      const existingExpert = await Expert.findById(serviceHour.expert);
      if (!existingExpert) {
        return res.status(500).send({error: 'Expert not found!'});
      }

      const user = (req as RequestWithUser).user;

      if (user._id.toString() !== serviceHour.expert.toString() && user.role !== 'admin') {
        return res.status(403).send({error: 'Access denied!'});
      }

      const removedServiceHour = await serviceHour.deleteOne();
      res.status(200).send({message: 'Working hours successfully removed', serviceHours: removedServiceHour});

    } catch (e) {
      return next(e);
    }
  },
);


export default serviceHoursRouter;