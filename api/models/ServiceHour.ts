import mongoose, {Types} from "mongoose";
import Expert from "./Expert";

const Schema = mongoose.Schema;

const ServicesHourSchema = new Schema(
  {
    expert: {
      type: Schema.Types.ObjectId,
      ref: 'Expert',
      required: true,
      validate: {
        validator: async (value: Types.ObjectId) => Expert.findById(value),
        message: 'There is no such expert',
      },
    },
    date: {
      type: Date,
      required: true,
    },
    hours: [{
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
    }],
  },
  {timestamps: true},
);
const ServicesHour = mongoose.model('ServicesHour', ServicesHourSchema);
export default ServicesHour;