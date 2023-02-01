const express = require("express");
require('dotenv').config();
// const { Server } = require("socket.io");
// const moment = require('moment'); 
const socket = require("socket.io");
const socketController = require ("./src/socket/index")
const bodyParser = require('body-parser');
// const helmet = require('helmet');
// const createError = require("http-errors");
const http = require("http");
const cors = require('cors');
const morgan = require("morgan");
const mainRouter = require('./src/routes/index');
const { response } = require('./src/helper/common');
// const messageModel = require("./src/model/messages");
// const jwt = require("jsonwebtoken");
const app = express();

// moment.locale("id");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
// app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}));
const PORT = process.env.PORT;
app.use('/', mainRouter);
app.use(bodyParser.json());
app.use('/img', express.static('./upload'));

app.all('*', (req, res, next) => {
  response(res, 404, false, null, '404 Not Found');
});

const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: "*",
  }
})

io.on("connection", (socket) =>{
  console.log("new user connect");
  socketController(io, socket);
});

server.listen(PORT, () => {
  console.log(`APP RUNNING ON ${PORT}`)
})

// const httpServer = http.createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: ["http://localhost:3000"],
//   },
// });

// io.use((socket, next) => {
//   const token = socket.handshake.query.token;
//   jwt.verify(token, process.env.JWT_KEY, function (error, decoded) {
//     if (error) {
//       if (error && error.name === "JsonWebTokenError") {
//         next(response(404, "token invalid"));
//       } else if (error && error.name === "TokenExpiredError") {
//         next(response(404,"token expired"));
//       } else {
//         next(response(404, "Token not active"));
//       }
//     }
//     socket.userId = decoded.id;
//     socket.join(decoded.id);
//     next();
//   });
// });

// io.on("connection", (socket) => {
//   console.log(`ada perangkat yg terhubung dengan id ${socket.id} dan id usernya ${socket.userId}`);

//   socket.on("inisialRoom", ({ room, username }) => {
//     console.log(room);
//     socket.join(`room:${room}`);

//     socket.broadcast.to(`room:${room}`).emit("notifAdmin", {
//       sender: "Admin",
//       message: `${username} bergabung dalam group`,
//       date: new Date().getHours() + ":" + new Date().getMinutes(),
//     });
//   });
 
//   socket.on("sendMessage", ({ idReceiver, messageBody }, callback) => {
//     const message = {
//       receiver_id: idReceiver,
//       message: messageBody,
//       sender_id: socket.userId,
//       created_at: new Date(),
//     };
//     console.log(message);
//     callback({ ...message, created_at: moment(message.created_at).format("LT") });
//     messageModel.create(message).then(() => {
//       socket.broadcast.to(idReceiver).emit("newMessage", message);
//     });
//   });

//   socket.on("disconnect", () => {
//     console.log(`ada perangkat yg terputus dengan id ${socket.id} dan id usernya ${socket.userId}`);
//   });
// });

// httpServer.listen(PORT, () => {
//   console.log(`server is running in port ${PORT}`);
// });



// // Private Chat
// //for connection
// io.on("connection", (socket) => {
//   console.log(`user connect ${socket.id}`)
// //mendefinisikan emit diFE
//   socket.on ("message",(data)=>{
//   //   let time = new Date();
//   //   socket.broadcast.emit("messageBe",{message: data, date: time})
//   //   console.log(data)
//   io.emit("messageBe",{message: data, date:  moment().format("HH:mm")})
//     console.log(data)
//   });
// //for disconnection
// socket.on("disconnect",()=>{
//   console.log(`user disconnect ${socket.id}`)
// });
// });

// //Grup Chat
// io.on("connection", (socket) => {
//   console.log(`user connect ${socket.id}`)
//   socket.on("initialRoom",({room})=>{
//       console.log(room)
//       socket.join(`room:${room}`)
//   })
//   socket.on("message",(data)=>{
//       io.to(`room:${data.group}`).emit("messageBe",{
//           sender: data.name,
//           message: data.message,
//           date:  moment().format("HH:mm")
//       })
//       console.log(data)
//   })
//   socket.on("disconnect",()=>{
//     console.log(`user disconnect ${socket.id}`)
// })
// });

// httpServer.listen(port, ()=>{
//     console.log(`app running on ${port}`)
// });