const User = require("../../../model/User");
const Conversations = require("../../../model/Conversation");
const getCustomerProfile = require("../../../apis/profiles/getCustomerProfile");
const hasDayPassed = require("../../../utils/hasDayPassed");
const parseFBMessage = require("../../../utils/parseFBMessage");

//called by webhook
const createConversation = async (payload) => {
  const { page_id, sender_id, receiver_id, timestamp, message } = payload;
  const user = await User.findOne({ page_id: page_id });
  if (!user) return null;

  // page_id=1, sender_id=2, receiver_id=1 ==>customer_id = 1^2^1= 2;
  const customer_id = page_id ^ sender_id ^ receiver_id;
  //chance of error due to findOne
  const conversation = await Conversations.findOne({
    $and: [{ customer_id }, { user_id: user._id }],
  })
    .sort({ updatedAt: -1 })
    .limit(1);
  
  //new conversation
  if (!conversation || hasDayPassed(conversation.updatedAt)) {
    const customer_profile = await getCustomerProfile(
      customer_id,
      user.page_token
    );
    const new_conversation_obj = {
      customer_id: customer_id,
      customer: customer_profile,
      last_message: parseFBMessage(message),
      user_id: user._id,
      updatedAt: timestamp
    };
    const new_conversation = await Conversations.create(new_conversation_obj);
    return new_conversation._id;
  }

  //old conversation
  conversation.seen = false;
  conversation.last_message = parseFBMessage(message);
  await conversation.save();
  return conversation._id;
};

module.exports = createConversation;
