// filepath: src/index.ts
import express from 'express';
import Logger from './utils/logger';
import { registerAllRoutes } from './routes/RouteHandler';

const logger = new Logger();

const app = express();
const port = 8443;

registerAllRoutes(app);

app.listen(port, () => {
  logger.info(`Server is running on https://localhost:${port}`);
});