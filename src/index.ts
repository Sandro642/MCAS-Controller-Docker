import express from 'express';
import readline from 'readline';

const app = express();
const port = 8443;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

const server = app.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Type "yes" to disconnect: ', (answer) => {
  if (answer.toLowerCase() === 'yes') {
    console.log('Disconnecting...');
    server.close(() => {
      console.log('Server disconnected');
      process.exit(0);
    });
  } else {
    console.log('Server continues to run');
  }
  rl.close();
});
