import mongoose, { Types } from 'mongoose';
import User from './User';

const Schema = mongoose.Schema;

const ExpertSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      validate: {
        validator: async (value: Types.ObjectId) => User.findById(value),
        message: 'There is no such user',
      },
    },
    info: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Expert = mongoose.model('Expert', ExpertSchema);
export default Expert;