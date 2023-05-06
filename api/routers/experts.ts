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
      const existingExpert = await Expert.findOne({user: req.body.user});
      if (existingExpert) {
        return res
          .status(500)
          .send({ error: 'Такой мастер уже существует' });
      }
      const user = await User.findById(req.body.user);

      if (!user) {
        return res.status(500).send({ error: 'Пользователь не найден!' });
      }

      const parsedServices = JSON.parse(req.body.services);

      const expert = await Expert.create({
        user: req.body.user,
        title: req.body.title,
        info: req.body.info,
        photo: req.file ? req.file.filename : null,
        services: parsedServices,
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

expertsRouter.get('/', async (req, res, next) => {
  try {

    const userId = req.query.user as string;
    const limit: number = parseInt(req.query.limit as string) || 10;
    const page: number = parseInt(req.query.page as string) || 1;

    const searchParam: { user?: string } = {};

    if (userId) {
      searchParam.user = userId;
    }

    const totalCount = await Expert.count(searchParam);
    const skip = (page - 1) * limit;

    const experts = await Expert.find()
      .populate('user', 'firstName lastName')
      .select('user photo title')
      .skip(skip)
      .limit(limit)
      .exec();
    return res.send({
      message: 'Эксперты найдены',
      result: { experts, currentPage: page, totalCount }
    });

  } catch (e) {
    return next(e);
  }
});

expertsRouter.get('/:id', async (req, res, next) => {
  try {
    const expert = await Expert.findById(req.params.id);
    if (!expert) {
      return res.status(404).send({ error: 'Мастер не найден!' });
    }
    return res.send(expert);
  } catch (e) {
    return next(e);
  }
});

expertsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const expertId = req.params.id;
    const expert = await Expert.findById(expertId);

    if (!expert) {
      return res
        .status(500)
        .send({ error: 'Учетная запись мастера не найдена!' });
    }

    const removedExpert = await expert.deleteOne();
    //Когда будет сущность запись. Добавить удаление связаных сущностей.

    res.send({
      message: 'Учетная запись мастера удалена',
      removedExpert,
    });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});



export default expertsRouter;