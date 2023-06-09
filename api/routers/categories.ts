import express from 'express';
import Category from '../models/Category';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import { imageUpload } from '../multer';
import mongoose from 'mongoose';
import path from 'path';
import config from '../config';
import fs from 'fs';

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (e) {
    return next(e);
  }
});

categoriesRouter.get('/:id', async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).send({ error: 'Категория не найдена!' });
    }
    return res.send(category);
  } catch (e) {
    return next(e);
  }
});

categoriesRouter.post(
  '/',
  auth,
  permit('admin'),
  imageUpload.single('image'),
  async (req, res, next) => {
    try {
      const category = await Category.create({
        title: req.body.title,
        image: req.file ? req.file.filename : null,
      });

      return res.send({ message: 'Категория создана!', category });
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      } else {
        return next(e);
      }
    }
  },
);

categoriesRouter.put(
  '/:id',
  auth,
  permit('admin'),
  imageUpload.single('image'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title } = req.body;

      const category = await Category.findById(id);

      if (!category) {
        return res.status(404).send({ error: 'Категория не найдена' });
      }

      category.title = title || category.title;

      if (req.file) {
        if (category.image) {
          const imagePath = path.join(config.publicPath, category.image);
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error('Error removing image:', err);
            }
          });
        }
        category.image = req.file.filename;
      }

      const updatedCategory = await category.save();

      res
        .status(200)
        .send({ message: 'Категория изменена!', category: updatedCategory });
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      } else {
        return next(e);
      }
    }
  },
);

categoriesRouter.delete(
  '/:id',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const deletedCategory = await Category.findByIdAndRemove(id);

      if (!deletedCategory) {
        return res.status(404).send({ error: 'Категория не найдена' });
      }

      res.status(200).send({ message: 'Категория удалена!' });
    } catch (e) {
      next(e);
    }
  },
);

export default categoriesRouter;
