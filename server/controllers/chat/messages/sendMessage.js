const User = require("../../../model/User");
const Conversation = require("../../../model/Conversation");
const sendCustomerMessage = require('../../../apis/messaging/sendCustomerMessage');

const sendMessages = async (req, res) => {
    const { user_id, message, conversation_id } = req.body;
    try {
        const user = await User.findById(user_id);
        const conversation = await Conversation.findById(conversation_id);
        //sending text message on Messenger
        await sendCustomerMessage(message, user.page_id, conversation.customer_id, user.page_token);
    } catch (err) {
        console.log(err);
    }
}

module.exports = sendMessages;
