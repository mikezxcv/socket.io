import express from 'express';
import http from 'http';
import cors from 'cors';
import pg from 'pg';
import { Server as socketIOServer } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config(); // 
const { Pool } = pg;
const app = express();
const server = http.createServer(app);
const io = new socketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,

  ssl: {
    rejectUnauthorized: false,
  }
});
console.log(process.env.PGUSER)

pool.query('select * from notes', (error, result) => {
  if (error) {
    console.error('Error al conectar a PostgreSQL:', error);
  } else {
    console.log('Conexión exitosa a PostgreSQL');
    console.log('Resultado de la consulta:', result.rows);
  }
});
// Importa y define la clase EditorController correctamente
// import EditorController from './src/controllers/EditorController.js';
// const editorController = new EditorController(io, pool);
console.log(io);

io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado.');

  socket.on('disconnect', () => {
    console.log('Un cliente se ha desconectado.');
  });

  socket.on('mensaje', (data) => {
    // editorController.guardarContenido(data);
    socket.emit('respuesta', `Se ha recibido un mensaje: ${data}`);

    console.log(`Se ha recibido un mensaje: ${data}`);
  });

  socket.emit('bienvenida', 'Bienvenido al servidor de socket.io.');
});

app.use(cors());

app.get('/', (req, res) => {
  res.send('Servidor HTTP creado con Express.');
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor HTTP iniciado en el puerto ${PORT}`);
});
