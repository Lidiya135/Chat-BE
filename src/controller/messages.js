const messagesModel = require("../model/messages");
const commonHelp = require("../helper/common");


const getMessage = async (req, res, next) => {
  const receiver_id = req.params.receiver_id;
  const sender_id = req.payload.id;
  const { rows } = await messagesModel.getMessage(sender_id, receiver_id);
  commonHelp.response(res, 200, true, rows, 'get message succes');
};

module.exports = {
  getMessage,
};
