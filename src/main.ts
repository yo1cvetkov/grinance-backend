import 'reflect-metadata';

import { connectDatabase } from './lib/db';

const bootstrap = async () => {
  await connectDatabase();
};

bootstrap();
