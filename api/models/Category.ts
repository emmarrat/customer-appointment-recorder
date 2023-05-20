import mongoose from "mongoose";

const Schema = mongoose.Schema;
const CategorySchema = new Schema({
  title: {
    required: true,
    type: String,
    unique: true,
  },
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;
