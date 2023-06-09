import mongoose, { Types } from 'mongoose';
import Expert from './Expert';
import User from './User';
import ServiceHour from './ServiceHour';
import { IAppointment } from '../types';

const Schema = mongoose.Schema;

const AppointmentSchema = new Schema<IAppointment>(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      validate: {
        validator: async (value: Types.ObjectId) => User.findById(value),
        message: 'Юзер не найден',
      },
    },
    expert: {
      type: Schema.Types.ObjectId,
      ref: 'Expert',
      required: true,
      validate: {
        validator: async (value: Types.ObjectId) => Expert.findById(value),
        message: 'Мастер не найден',
      },
    },
    service: {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
    date: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'ServiceHour',
      validate: {
        validator: async (value: Types.ObjectId) => ServiceHour.findById(value),
        message: 'Дата не найдена',
      },
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Appointment = mongoose.model<IAppointment>(
  'Appointment',
  AppointmentSchema,
);
export default Appointment;
