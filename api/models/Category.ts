import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const CategorySchema = new Schema({
  title: {
    required: true,
    type: String,
    unique: true,
  },
  image: {
    required: true,
    type: String,
  },
});

const Category = mongoose.model('Category', CategorySchema);
export default Category;
