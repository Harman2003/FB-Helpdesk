const User = require("../../../model/User");
const Message = require("../../../model/Messages");
const Conversation = require("../../../model/Conversation");
const sendCustomerMessage = require("../../../apis/messaging/sendCustomerMessage");
const { isValidObjectId } = require("mongoose");
const { updatedConversationNotification } = require("../../../socket");

const sendMessages = async (req, res) => {
  const { message, conversation_id } = req.body;
  const { user_id } = req.query;
  if (!isValidObjectId(conversation_id)) {
    return res.sendStatus(404);
  }
  try {
    const user = await User.findById(user_id);
    const conversation = await Conversation.findById(conversation_id);
    if (!conversation) return res.sendStatus(404);

    const { page_id, page_token } = user;
    const { customer_id } = conversation;

    //sending text message on Messenger
    const sentMessage = await sendCustomerMessage(
      message,
      page_id,
      customer_id,
      page_token
    );

    //store in DB
    const saveMessageObject = {
      mid: sentMessage.message_id,
      conversation_id,
      sender_id: page_id,
      receiver_id: customer_id,
      mode: "self",
      message,
      payload: {
        type: "text",
        url: "",
      },
      createdAt: new Date(),
    };
    await Message.create(saveMessageObject);

    //update conversation
    conversation.last_message = message;
    conversation.updatedAt = new Date();
    conversation.seen = 0;
    updatedConversationNotification(
      user_id.toString(),
      {
        _id: conversation_id,
        last_message: message,
        updatedAt: conversation.updatedAt,
        seen:0
      },
      (response) => {}
    );
    await conversation.save();

    // await Message.create(saveMessageObject);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Message not sent" });
  }
};

module.exports = sendMessages;
