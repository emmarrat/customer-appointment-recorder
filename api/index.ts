import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import usersRouter from './routers/users';
import expertsRouter from './routers/experts';
import serviceHoursRouter from './routers/serviceHours';
import appointmentsRouter from './routers/appointments';
import categoriesRouter from './routers/categories';
import expressWs from 'express-ws';
import {
  ActiveConnections,
  IUserFull,
  IncomingMessage,
  IMessage,
} from './types';
import crypto from 'crypto';
import User from './models/User';
import Message from './models/Message';

const app = express();
const port = 8000;
expressWs(app);
const router = express.Router();

const activeConnections: ActiveConnections = {};
let activeUser: IUserFull | null = null;
const activeUsers: IUserFull[] = [];

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/users', usersRouter);
app.use('/experts', expertsRouter);
app.use('/service-hours', serviceHoursRouter);
app.use('/appointments', appointmentsRouter);
app.use('/categories', categoriesRouter);

router.ws('/chat', async (ws) => {
  const id = crypto.randomUUID();
  activeConnections[id] = ws;

  ws.on('message', async (message) => {
    const decodedMessage = JSON.parse(message.toString()) as IncomingMessage;

    switch (decodedMessage.type) {
      case 'LOGIN':
        const token = decodedMessage.payload;
        const user: IUserFull | null = await User.findOne({ token });
        if (!user) {
          return console.log({ error: 'Wrong token!' });
        }
        activeUser = user;
        activeUsers.push(activeUser);

        Object.values(activeConnections).forEach((connection) => {
          connection.send(
            JSON.stringify({ type: 'ACTIVE_USERS', payload: activeUsers }),
          );
        });

        const messages = await Message.find({})
          .sort({ createdAt: -1 })
          .limit(30);
        ws.send(
          JSON.stringify({
            type: 'INITIAL_MESSAGES',
            payload: messages.reverse(),
          }),
        );
        break;

      case 'SEND_MESSAGE':
        if (activeUser === null) break;

        const message: IMessage = {
          username: `${activeUser.firstName} ${activeUser.lastName}`,
          text: decodedMessage.payload,
          createdAt: new Date(),
        };

        const savedMessage = await Message.create(message);
        Object.keys(activeConnections).forEach((id) => {
          const conn = activeConnections[id];
          conn.send(
            JSON.stringify({
              type: 'NEW_MESSAGE',
              payload: savedMessage,
            }),
          );
        });
        break;

      case 'DELETE_MESSAGE':
        if (activeUser?.role !== 'admin') break;

        const messageId = decodedMessage.payload;
        await Message.deleteOne({ _id: messageId });
        const updatedMessages = await Message.find({})
          .sort({ createdAt: -1 })
          .limit(30);
        Object.keys(activeConnections).forEach((id) => {
          const conn = activeConnections[id];
          conn.send(
            JSON.stringify({
              type: 'INITIAL_MESSAGES',
              payload: updatedMessages.reverse(),
            }),
          );
        });
        break;

      default:
        console.log('Unknown type: ', decodedMessage.type);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected! id= ', id);
    delete activeConnections[id];
    const index = activeUsers.findIndex((user) => user._id === activeUser?._id);
    activeUsers.splice(index, 1);
    Object.values(activeConnections).forEach((connection) => {
      connection.send(
        JSON.stringify({ type: 'ACTIVE_USERS', payload: activeUsers }),
      );
    });
  });
});

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log('we are live on ' + port);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
