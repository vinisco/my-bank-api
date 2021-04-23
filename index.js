import express from "express";
import cors from "cors";
import { promises as fs } from "fs";

import { routes } from "./src/routes/routes.js";

const { readFile, writeFile } = fs;
global.fileName = "accounts.json";

const app = express();
app.use(cors());

app.use(express.json());

app.use(routes);

app.listen(3000, async () => {
  try {
    await readFile(global.fileName);
    console.log("API Started");
  } catch (err) {
    const accounts = {
      nextId: 1,
      accounts: [],
    };
    writeFile(global.fileName, JSON.stringify(accounts))
      .then(() => {
        console.log("API Started an File Created");
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
