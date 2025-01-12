import 'reflect-metadata';

import express from 'express';
import { connectToDb } from './lib/data-source';

import apiRouter from './api-router';
import { globalErrorHandler } from './utils/globalErrorHandler';

const bootstrap = async () => {
  await connectToDb();

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/api', apiRouter);

  app.use(globalErrorHandler);

  app.listen(process.env.PORT, () => {
    console.log(`Server is listening on http://localhost:${process.env.PORT}`);

    console.log(
      `REST API is listening on http://localhost:${process.env.PORT}/api`
    );
  });
};

bootstrap().catch((error) => {
  console.log(error.message);
  process.exit(1);
});
