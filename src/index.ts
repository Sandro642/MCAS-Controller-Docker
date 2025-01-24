// filepath: src/index.ts
import express from 'express';
import Logger from './utils/logger';
import nameApp from './utils/nameApp';

const logger = new Logger();

const app = express();
const port = 8443;

app.get('/', (req, res) => {
  res.send(nameApp.message);
});

app.listen(port, () => {
  logger.info(`Server is running on https://localhost:${port}`);
});