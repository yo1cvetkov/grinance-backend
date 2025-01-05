import "reflect-metadata";

import express from "express";
import { connectToDb } from "./lib/data-source";

const bootstrap = async () => {
  await connectToDb();

  const app = express();

  app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port http://localhost:${process.env.PORT}`);
  });
};

bootstrap();
