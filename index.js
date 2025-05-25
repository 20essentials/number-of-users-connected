import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { join } from 'node:path';

process.loadEnvFile();
const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {});
const clientCarpet = path => join(import.meta.dirname, 'client', path);

io.on('connection', async socket => {
  let total = io.engine.clientsCount;

  socket.on('disconnect', () => {
    total = io.engine.clientsCount;
    socket.emit('totalClient', { total });
     console.log("Number of Users: ", total);
  });

  socket.emit('totalClient', { total });
  console.log("Number of Users: ", total);
});

app.get('/', (_, res) => {
  res.sendFile(clientCarpet('index.html'));
});

app.get('/favicon.webp', (_, res) => {
  res.sendFile(clientCarpet('favicon.webp'));
});

server.listen(port, () => {
  console.log(`Server open in http://localhost:${port}`);
});
