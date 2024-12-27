import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import fs from 'node:fs/promises';
import * as yaml from 'yaml';

import type { OpenAPIObject } from 'openapi3-ts/oas30';
import { registry } from './swagger-instance';
import env from 'src/config/env.config';

export const getOpenApiDocumentation = (): OpenAPIObject => {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: env.APP_VERSION,
      title: env.APP_NAME,
      description: 'Grinance backend for AI finanace tracker',
    },
    servers: [{ url: '/api' }],
  });
};

export const convertDocumentationToYaml = (): string => {
  const docs = getOpenApiDocumentation();

  const fileContent = yaml.stringify(docs);

  return fileContent;
};

export const writeDocumentationToDisk = async (): Promise<void> => {
  const fileContent = convertDocumentationToYaml();

  await fs.writeFile(`${__dirname}/openapi-docs.yaml`, fileContent, {
    encoding: 'utf-8',
  });
};
