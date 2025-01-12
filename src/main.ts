import 'reflect-metadata';

import express from 'express';
import { connectToDb } from './lib/data-source';

import apiRouter from './api-router';
import { globalErrorHandler } from './utils/globalErrorHandler';

import cookieSession from 'cookie-session';
import env from './config/env.config';

const bootstrap = async () => {
  await connectToDb();

  const app = express();

  app.use(
    cookieSession({
      name: 'session',
      secret: env.COOKIE_SESSION_SECRET_KEY,
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
  );

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
