import env from 'src/config/env.config';
import { DataSource } from 'typeorm';
import logger from './logger.service';

export const db = new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_P,
  database: env.DB_NAME,
});

export const connectDatabase = async () => {
  try {
    logger.info('Connecting to database...');

    await db.initialize();

    logger.info('Database connected');
  } catch (err) {
    logger.error('Error durring datasource connection');
    console.error(err);
    process.exit(1);
  }
};
