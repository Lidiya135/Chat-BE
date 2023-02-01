const pool = require("../config/db");

const store = (data) => {
  const { receiver, sender, message } = data;
  console.log(data, "data dr store model");
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO chat (sender_id, receiver_id, message) 
        VALUES ('${sender}', '${receiver}', '${message}')`,
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      }
    );
  });
};

const list = (sender, receiver) => {
  return new Promise((resolve, reject) => {
    console.log(sender, receiver, 'data dr list model');
    pool.query(
      `SELECT chat.id, chat.message, 
          userSender.username AS sender, 
          userReceiver.username AS receiver,
          to_char( chat.created_at, 'HH:MI DD/Mon/YYYY' ) AS created_at
        FROM chat as chat
        LEFT JOIN users AS userSender ON chat.sender_id=userSender.id
        LEFT JOIN users AS userReceiver ON chat.receiver_id=userReceiver.id
        WHERE
        (sender_id='${sender}' AND receiver_id='${receiver}')
        OR (sender_id='${receiver}' AND receiver_id='${sender}')`,
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      }
    );
  });
};

const listt = (sender, receiver) => {
  return new Promise((resolve, reject) => {
    console.log(sender, receiver, "data dari list");
    pool.query(
      `SELECT chats.id, chats.message, userSender.username AS sender, userReceiver.username AS receiver
      FROM chat as chats
      LEFT JOIN users AS userSender ON chats.sender_id=userSender.id
      LEFT JOIN users AS userReceiver ON chats.receiver_id=userReceiver.id 
      WHERE
      (sender_id='${sender}' AND receiver_id='${receiver}')
      OR (sender_id='${receiver}' AND receiver_id='${sender}') ORDER BY created_at`,
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      }
    );
  });
};

module.exports = {
  list,
  store,
  listt
};