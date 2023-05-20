import path from "path";
import * as dotenv from "dotenv";
dotenv.config();

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, "public"),
  db: "mongodb://localhost/customer-appointment-recorder",
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
};

export default config;
