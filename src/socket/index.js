const { store, list } = require('../model/chats.js');

module.exports = (io, socket) => {
  socket.on('ping', (data) => {
    socket.emit('ping-response', data);
  });
  
  // join private room
  socket.on('join-room', (data) => {
    const { id, username, password } = data;
    socket.join(id);
    console.log(data, "data from socket join")
  });

  // post private room(sender)
  socket.on('send-message', (data) => {
    store(data)
      .then(async () => {
        const listChats = await list(data.sender, data.receiver);
        console.log(listChats.rows," list chat post message");
        io.to(data.receiver).emit('send-message-response', listChats.rows);
      })
      .catch((err) => {
        console.log('error send message');
        console.log(err);
      });
  });

  // get history chat(receiver)
  socket.on('chat-history', async (data) => {
    try {
      console.log(data);
      const listChats = await list(data.sender, data.receiver);
      console.log(listChats.rows," list history chat post message");
      io.to(data.sender).emit('send-message-response', listChats.rows);
    } catch (err) {
      console.log('Error chat-history');
      console.log(err);
    }
  });

  //join group chat
  socket.on("join_room_group", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined rooms: ${data}`);
  });

  socket.on("send_message_group", (data) => {
    socket.to(data.rooms).emit("receive_message_group", data);
  });
};