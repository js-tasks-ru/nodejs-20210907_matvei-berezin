const Message = require('../models/Message');

module.exports.messageList = async function messages(ctx, next) {
  const messageList = await Message.find().limit(1);

  ctx.body = {
    messages: messageList.map((message) => ({
      id: message.id,
      date: message.date,
      text: message.text,
      user: message.user,
    }),
    ),
  };
};
