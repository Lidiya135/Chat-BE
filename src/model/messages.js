const pool = require("../config/db");

const create = ({ sender_id, receiver_id, message }) => {
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO chat(sender_id, receiver_id, message)VALUES($1, $2, $3)", [sender_id, receiver_id, message], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};
const getMessages = (sender_id, receiver_id) => {
  console.log(sender_id, "sender_id_model");
  console.log(receiver_id, "receiv_id_model");
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM chat where (sender_id = '${sender_id}' AND receiver_id = '${receiver_id}') OR (sender_id = '${receiver_id}' AND receiver_id = '${sender_id}') ORDER BY created_at ASC`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};
module.exports = {
  create,
  getMessages,
};
