import express from "express";
import http from "http";
import cors from "cors";
import pg from "pg";
import { Server as socketIOServer } from "socket.io";
import dotenv from "dotenv";
import routes from "./src/routes/api.mjs";
import EditorController from "./src/controllers/EditorController.mjs";
import { log } from "console";

dotenv.config(); //
const { Pool } = pg;
const app = express();
const server = http.createServer(app);
const io = new socketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,

  ssl: {
    rejectUnauthorized: false,
  },
});

const editorController = new EditorController(io, pool);

io.on("connection", (socket) => {
  console.log("Un cliente se ha conectado.");

  socket.on("disconnect", () => {
    console.log("Un cliente se ha desconectado.");
  });

  socket.on("mensaje", (data) => {
    // editorController.guardarContenido(data);
    socket.emit("respuesta", `Se ha recibido un mensaje: ${data}`);

    console.log(`Se ha recibido un mensaje: ${data}`);
  });

  socket.on("leer_notas", async () => {
    log("Se ha recibido una solicitud de lectura de notas");
    const notas = await editorController.leerNotas();
    log(notas);
  });
  

  socket.emit("bienvenida", "Bienvenido al servidor de socket.io.");
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("Servidor HTTP creado con Express.");
});

app.use("/api", routes);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor HTTP iniciado en el puerto ${PORT}`);
});
