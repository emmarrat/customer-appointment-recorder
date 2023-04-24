import express from "express";
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import {imageUpload} from "../multer";
import Expert from "../models/Expert";
import User from "../models/User";
import mongoose from "mongoose";

const expertsRouter = express.Router();

expertsRouter.post(
  '/',
  auth,
  permit('admin'),
  imageUpload.single('photo'),
  async (req, res, next) => {
    try {
      const existingTeacher = await Expert.findOne({
        user: req.body.user,
      });
      if (existingTeacher) {
        return res
          .status(500)
          .send({ error: 'Такой мастер уже существует' });
      }
      const user = await User.findById(req.body.user);
      if (!user) {
        return res.status(500).send({ error: 'Пользователь не найден!' });
      }


      const expert = await Expert.create({
        user: req.body.user,
        info: req.body.info,
        photo: req.file ? req.file.filename : null,
      });

      user.role = 'expert';
      await user.save();

      return res.send({
        message: 'Учетная запись мастера создана!',
        expert,
      });
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      } else {
        return next(e);
      }
    }
  },
);