import 'reflect-metadata';
import './openapi/zod-extend';

import express from 'express';

import { connectDatabase } from './lib/db';
import env from './config/env.config';
import morgan from 'morgan';
import YAML from 'yaml';
import swaggerUi from 'swagger-ui-express';
import logger, { httpLogger } from './lib/logger.service';
import { convertDocumentationToYaml } from './openapi/swagger-doc-generator';

const bootstrap = async () => {
  await connectDatabase();

  const app = express();

  if (env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else {
    app.use(httpLogger);
  }

  app.use(express.json());
  app.use(express.urlencoded());

  const swaggerDocument = YAML.parse(convertDocumentationToYaml());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.listen(env.PORT, () => {
    logger.info(`Server is running on http://localhost:${env.PORT}`);
    logger.info(`RESTful API: http://localhost:${env.PORT}/api`);
    logger.info(`Swagger API docs: http://localhost:${env.PORT}/api-docs`);
  });
};

bootstrap();
