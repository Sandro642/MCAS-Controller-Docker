import path from 'path';
import fs from 'fs';
import express from 'express';
import { getAllFilesRecursive } from '../utils/fileUtils';
import Logger from '../utils/logger';
import Joi from 'joi';

const logger = new Logger();

export interface RouteProperties {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
  url: string;
  handler: express.RequestHandler;
  enabled: boolean;
  schema?: any;
}

const directoryPath = path.resolve(__dirname);

/**
 * Register all routes by searching for all files in the definition folder and register them
 * @param app The express instance
 */
export function registerAllRoutes(app: express.Application) {
  fs.readdirSync(directoryPath).forEach((file) => {
    if (!fs.statSync(path.join(directoryPath, file)).isDirectory()) return;

    const routeFiles = getAllFilesRecursive(path.join(directoryPath, file, 'definition')).filter((file) => file.endsWith('.ts'));

    for (const routeFile of routeFiles) {
      const route = require(routeFile);

      const routeProperties: RouteProperties = route.default;
      if (!routeProperties) {
        logger.warn(`La route ${routeFile} n'a pas d'export par défaut, elle est ignorée.`);
        continue;
      }

      if (!routeProperties.enabled) {
        logger.warn(`Note: La route ${routeFile} est désactivée.`);
        continue;
      }

      try {
        const handler = (req: express.Request, res: express.Response, next: express.NextFunction) => {
          if (routeProperties.schema) {
            const { error } = Joi.object(routeProperties.schema.response[200]).validate(req.body);
            if (error) {
              return res.status(400).send(error.details);
            }
          }
          routeProperties.handler(req, res, next);
        };

        switch (routeProperties.method.toLowerCase()) {
          case 'get':
            app.get(routeProperties.url, handler);
            break;
          case 'post':
            app.post(routeProperties.url, handler);
            break;
          case 'put':
            app.put(routeProperties.url, handler);
            break;
          case 'delete':
            app.delete(routeProperties.url, handler);
            break;
          case 'patch':
            app.patch(routeProperties.url, handler);
            break;
          case 'options':
            app.options(routeProperties.url, handler);
            break;
          case 'head':
            app.head(routeProperties.url, handler);
            break;
          default:
            throw new Error(`Unsupported method: ${routeProperties.method}`);
        }
      } catch (e) {
        logger.error(`Erreur lors de l'enregistrement de la route ${routeProperties.method.toUpperCase()} ${routeProperties.url}`);
        console.error(e);
        continue;
      }

      logger.info(`Enregistrement de la route ${routeProperties.method.toUpperCase()} ${routeProperties.url}`);
    }
  });
}