const Conversation = require("../../../model/Conversation");

//account must exist
const deleteConversations = async (req, res) => {
  const { user_id, conversationIds } = req.query;
  const conversationIdList = conversationIds.split(",");
  try {
    const conversationList = await Conversation.deleteMany({
      $and: [{ user_id: user_id }, { _id: { $in: conversationIdList } }],
    });
    return res.status(200).json({ ...conversationList });
  } catch (err) {
    console.log(err);
  }
};

module.exports = deleteConversations;
