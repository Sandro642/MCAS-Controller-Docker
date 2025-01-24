// filepath: /typescript-express-app/src/index.ts
import express from 'express';

const app = express();
const port = 8443;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});