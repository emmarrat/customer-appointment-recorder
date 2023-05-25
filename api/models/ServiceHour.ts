import mongoose, { Types } from 'mongoose';
import Expert from './Expert';

const Schema = mongoose.Schema;

const ServiceHourSchema = new Schema(
  {
    expert: {
      type: Schema.Types.ObjectId,
      ref: 'Expert',
      required: true,
      validate: {
        validator: async (value: Types.ObjectId) => Expert.findById(value),
        message: 'Эксперт не найден',
      },
    },
    date: {
      type: Date,
      required: true,
    },
    hours: [
      {
        startTime: {
          type: String,
          required: true,
        },
        endTime: {
          type: String,
          required: true,
        },
        status: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
    ],
  },
  { timestamps: true },
);
const ServiceHour = mongoose.model('ServiceHour', ServiceHourSchema);
export default ServiceHour;
