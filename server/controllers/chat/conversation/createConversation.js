const User = require("../../../model/User");
const Customers = require("../../../model/Customers");
const Conversations = require("../../../model/Conversation");
const getCustomerProfile = require("../../../apis/data/getCustomerProfile");
const hasDayPassed = require("../../../utils/hasDayPassed");
const parseFBMessage = require("../../../utils/parseFBMessage");
const timeout = require("../../../utils/timeout");
const {
  newConversationNotification,
  updatedConversationNotification,
} = require("../../../socket");

//called by fb-webhook
const createConversation = async (payload) => {
  const { page_id, sender_id, receiver_id, timestamp, message } = payload;
  const user = await User.findOne({ page_id: page_id });
  if (!user) return null;

  const customer_id = page_id === sender_id ? receiver_id : sender_id;
  const conversation = await Conversations.findOne({
    $and: [{ customer_id }, { user_id: user._id }],
  })
    .sort({ updatedAt: -1 })
    .limit(1);

  if (!conversation || hasDayPassed(conversation.updatedAt)) {
    //store customer profile

    const customer_profile = await getCustomerProfile(
      customer_id,
      user.page_token
    );
    await Customers.create({ ...customer_profile, customer_id });

    //new conversation
    const new_conversation_obj = {
      customer_id: customer_id,
      customer_name: customer_profile.firstname.concat(
        " ",
        customer_profile.lastname
      ),
      last_message: parseFBMessage(message),
      user_id: user._id,
      seen: page_id !== sender_id ? 1 : 0,
      updatedAt: new Date(timestamp),
    };

    const new_conversation = await Conversations.create(new_conversation_obj);
    await newConversationNotification(user._id.toString(), new_conversation);

    return new_conversation._id;
  }

  //old conversation
  conversation.last_message = parseFBMessage(message);
  conversation.updatedAt = new Date(timestamp);
  if (page_id !== sender_id) {
    conversation.seen = conversation.seen + 1;
  }
  console.log(conversation.seen, "seen");
  await conversation.save();

  const { _id, last_message, updatedAt, seen } = conversation;
  await updatedConversationNotification(
    user._id.toString(),
    {
      _id,
      last_message,
      updatedAt,
      seen,
    },
    async (err, response) => {
      if (err) return;
      if (typeof response === "object" && response[0]?.chat_id) {
        const { chat_id } = response[0];

        const conversation_ = await Conversations.findById(chat_id);
        conversation_.seen = 0;
        console.log(conversation_.seen, "seen callback");
        await conversation_.save();
      }
    }
  );

  return conversation._id;
};

module.exports = createConversation;
