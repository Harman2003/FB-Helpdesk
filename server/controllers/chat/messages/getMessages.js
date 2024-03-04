const Conversation = require("../../../model/Conversation");
const Message = require("../../../model/Messages");

const getMessages = async (req, res) => {
  const { user_id, conversation_id } = req.query;
  try {
    const conversation = await Conversation.findById(conversation_id);
    if (user_id !== conversation.user_id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const messages = await Message.find({ conversation_id });
    conversation.seen = true;
    await conversation.save();
    return res.status(200).json(messages);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = getMessages;
