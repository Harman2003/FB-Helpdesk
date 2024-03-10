const Message = require("../../../model/Messages");
const Conversation = require("../../../model/Conversation");
const { newMessageNotification } = require("../../../socket");

//called by webhook
const receiveMessages = async (payload, conversation_id) => {
  const { page_id, sender_id, receiver_id, timestamp, message } = payload;

  const new_message = {
    mid: message.mid,
    conversation_id,
    sender_id,
    receiver_id,
    mode: page_id === sender_id ? "self" : "other",
    message: message.text,
    payload: {
      type: message.type,
      url: message.image,
    },
    createdAt: new Date(timestamp),
  };
  try {
    const conversation = await Conversation.findById(conversation_id);
    newMessageNotification(conversation.user_id.toString(), new_message);
    await Message.create(new_message);
  } catch (err) {
    console.log(err);
  }
};

module.exports = receiveMessages;
