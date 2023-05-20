import mongoose, { Types } from "mongoose";
import User from "./User";
import Category from "./Category";

const Schema = mongoose.Schema;

const ExpertSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      validate: {
        validator: async (value: Types.ObjectId) => User.findById(value),
        message: "Юзер не найден",
      },
    },
    category: {
      ref: "Category",
      required: true,
      validate: {
        validator: async (value: Types.ObjectId) => Category.findById(value),
        message: "Категория не найдена",
      },
    },
    title: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    services: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Expert = mongoose.model("Expert", ExpertSchema);
export default Expert;
