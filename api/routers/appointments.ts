import express from "express";
import ServiceHour from "../models/ServiceHour";
import mongoose from "mongoose";
import Appointment from "../models/Appointment";
import auth, {RequestWithUser} from "../middleware/auth";

const appointmentsRouter = express.Router();

appointmentsRouter.post('/', auth, async (req, res, next) => {
  try {
    const {expert, service, date, startTime, endTime} = req.body;
    const user = (req as RequestWithUser).user;

    const serviceHour = await ServiceHour.findOne({
      _id: date,
      hours: {$elemMatch: {startTime, endTime, status: false}},
    });

    if (!serviceHour) {
      return res.status(400).send({error: 'Указанный день уже занят'});
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
      {_id: date, 'hours.startTime': startTime},
      {$set: {'hours.$.status': true}}
    );

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


export default appointmentsRouter;

