const Conversation = require("../../../model/Conversation");
const Customer = require("../../../model/Customers");

const getConversations = async (req, res) => {
  const { user_id } = req.query;
  try {
    const conversationList = await Conversation.find({ user_id: user_id }).sort(
      { updatedAt: -1 }
    );
    return res.status(200).json([...conversationList]);
  } catch (err) {
    console.log(err);
  }
};

module.exports = getConversations;
