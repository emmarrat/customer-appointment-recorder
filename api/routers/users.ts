import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import mongoose from 'mongoose';
import User from '../models/User';
import { imageUpload } from '../multer';
import config from '../config';
import { downloadFile } from '../helper';
import { randomUUID } from 'crypto';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import crypto from 'crypto';
import constants from '../constants';

const usersRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);

usersRouter.post('/', imageUpload.single('avatar'), async (req, res, next) => {
  try {
    const token = crypto.randomBytes(4).toString('hex');

    const user = new User({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber ? req.body.phoneNumber : null,
      avatar: req.file ? req.file.filename : null,
      verifyEmailToken: token,
    });

    user.generateToken();
    await user.save();
    await constants.SEND_EMAIL(
      req.body.email,
      'Подтверджение почты',
      constants.EMAIL_VERIFICATION(token, req.body.firstName),
    );
    return res.send({ message: 'Registered successfully!', user });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send({ error: 'Email не найден!' });
  }

  const isMatch = await user.checkPassword(req.body.password);

  if (!isMatch) {
    return res.status(400).send({ error: 'Неверный email и/или пароль' });
  }

  if (!user.verified) {
    const token = crypto.randomBytes(4).toString('hex');
    user.verifyEmailToken = token;
    await user.save();
    await constants.SEND_EMAIL(
      req.body.email,
      'Подтверджение почты',
      constants.EMAIL_VERIFICATION(token, user.firstName),
    );
    return res.status(400).send({
      error: 'Email не подтвержден, на вашу почту было выслано письмо!',
    });
  }

  try {
    user.generateToken();
    await user.save();
    return res.send({ message: 'Email and password correct!', user });
  } catch (e) {
    return next(e);
  }
});

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const success = { message: 'OK' };

    if (!token) {
      return res.send(success);
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.send(success);
    }

    user.generateToken();
    await user.save();
    return res.send(success);
  } catch (e) {
    return next(e);
  }
});

usersRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({ error: 'Wrong Google token!' });
    }

    const email = payload['email'];
    const googleId = payload['sub'];
    const firstName = payload['given_name'];
    const lastName = payload['family_name'];
    const avatarUrl = payload['picture'];

    if (!email) {
      return res.status(400).send({ error: 'Not enough user data' });
    }

    let user = await User.findOne({ googleId });

    if (!user) {
      const avatar =
        'images/' + (await downloadFile(avatarUrl as string, 'images'));

      user = new User({
        email,
        password: randomUUID(),
        firstName,
        lastName,
        avatar,
        googleId,
        phoneNumber: null,
      });
    }

    user.generateToken();
    await user.save();
    return res.send({ message: 'Login with Google successful', user });
  } catch (e) {
    return next(e);
  }
});

usersRouter.get('/basics', auth, permit('admin'), async (req, res, next) => {
  try {
    const user = await User.find({ role: 'user' });

    return res.send(user);
  } catch (e) {
    return next(e);
  }
});

usersRouter.post('/verify-email/:token', async (req, res, next) => {
  try {
    const user = await User.findOne({
      verifyEmailToken: req.params.token,
    });

    if (!user) {
      return res
        .status(404)
        .send({ error: 'Неверный токен, вам был выслан новый токен' });
    }

    user.verified = true;
    user.verifyEmailToken = null;
    user.generateToken();
    await user.save();
    return res
      .status(200)
      .send({ message: 'Почта успешно подтверждена!', user });
  } catch (e) {
    return next(e);
  }
});

export default usersRouter;
