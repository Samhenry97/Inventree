import dotenv from 'dotenv';
import express from 'express';
import { Server } from 'http';
import Socket from 'socket.io';
import './utils/db';
import ConnectionHandler from './utils/connection.handler';

dotenv.config();

// Set up the main server
const app = express();
const server = new Server(app);
const io = Socket(server);
server.listen(process.env.PORT || 8000);

// Serve the actual Vue client
app.use('/', express.static(process.cwd() + '/../client/dist'));

// Set up the Socket.io handler
new ConnectionHandler(io);
