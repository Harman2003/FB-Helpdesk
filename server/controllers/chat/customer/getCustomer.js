const Customers = require("../../../model/Customers");
const Conversations = require("../../../model/Conversation");
const { isValidObjectId } = require("mongoose");

const getCustomer = async (req, res) => {
  const { user_id, conversation_id } = req.query;
  if (!isValidObjectId(conversation_id)) {
    return res.sendStatus(404);
  }
  const conversation = await Conversations.findById(conversation_id);
  if (!conversation) return res.sendStatus(404);
 if (!user_id.equals(conversation.user_id)) {
   return res.sendStatus(401);
 }
  try {
    const customer = await Customers.findOne({ customer_id: conversation.customer_id });
    return res.status(200).json(customer);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = getCustomer;
