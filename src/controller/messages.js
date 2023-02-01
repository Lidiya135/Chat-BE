// const messagesModel = require("../model/messages");
const { create, getMessages } = require ("../model/messages");
const { response } = require ("../helper/common");


const getMessage = async (req, res, next) => {
  const receiver_id = req.params.receiver_id;
  const sender_id = req.payload.id;
  console.log(sender_id, "senderr_cntrlr");
  console.log(receiver_id, "receiver_cntrlr");
  const rows = await getMessages(sender_id, receiver_id);
  response(res, 200, true, rows, 'get message succes');
  // console.log(rows)
};

module.exports = {
  getMessage,
};
