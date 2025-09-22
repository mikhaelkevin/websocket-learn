require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const bodyParser = require('body-parser');
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const port = process.env.PORT || process.env.LOCAL_PORT;

// --- HTTP + Socket.IO ---
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(xss());
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
const customerRoutes = require('./routes/customerRoutes');
app.use('/call-center', customerRoutes);

// Track sockets + availability
io.on("connection", (socket) => {
  console.log("✅ Client connected:", socket.id);

  // Default to available
  socket.data.available = true;

  socket.on("setAvailability", (status) => {
    socket.data.available = status;
    console.log(`Client ${socket.id} is now ${status ? "available" : "busy"}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`🚀 Running on port ${port}`);
});
