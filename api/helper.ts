import axios from "axios";
import { randomUUID } from "crypto";
import path from "path";
import config from "./config";
import fs from "fs";

export const downloadFile = async (
  url: string,
  storeDir: string
): Promise<string> => {
  try {
    const { data, headers } = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    const extension = headers["content-type"].split("/")[1];
    const filename = `${randomUUID()}.${extension}`;
    const dirPath = path.join(config.publicPath, storeDir);

    await fs.promises.mkdir(dirPath, { recursive: true });
    const filePath = path.join(dirPath, filename);
    data.pipe(fs.createWriteStream(filePath));
    return filename;
  } catch (e) {
    throw new Error("An error occurred while downloading the file: " + e);
  }
};
