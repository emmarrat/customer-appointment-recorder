import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import config from "./config";
import usersRouter from "./routers/users";
import expertsRouter from "./routers/experts";
import serviceHoursRouter from "./routers/serviceHours";
import appointments from "./routers/appointments";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use("/users", usersRouter);
app.use("/experts", expertsRouter);
app.use("/service-hours", serviceHoursRouter);
app.use("/appointments", appointments);

const run = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(config.db);
  app.listen(port, () => {
    console.log("we are live on " + port);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
