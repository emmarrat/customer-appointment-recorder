import cors from 'cors';
import express from 'express';
import mongoose from "mongoose";
import config from "./config";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

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

