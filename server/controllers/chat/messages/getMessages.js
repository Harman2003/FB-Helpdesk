const { isValidObjectId } = require("mongoose");
const Conversation = require("../../../model/Conversation");
const Message = require("../../../model/Messages");

const getMessages = async (req, res) => {
  const { user_id, conversation_id } = req.query;
  if (!isValidObjectId(conversation_id)) {
    return res.sendStatus(404);
  }

  try {
    const conversation = await Conversation.findById(conversation_id);
    if (!conversation) return res.sendStatus(404);
    if (!user_id.equals(conversation.user_id)) {
      return res.sendStatus(401);
    }

    const messages = await Message.find({ conversation_id }).sort({createdAt:1});
    conversation.seen = 0;
    await conversation.save();
    return res
      .status(200)
      .json([...messages]);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
};

module.exports = getMessages;
