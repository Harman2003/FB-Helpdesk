const Message = require("../../../model/Messages");

//called by webhook
const receiveMessages = async (payload, conversation_id) => {
    const { sender_id, receiver_id, timestamp, message } = payload;
    const new_message = {
        conversation_id,
        sender_id,
        receiver_id,
        message: message.text,
        payload: {
            type: message.type,
            url:message.image,
        }
    }
    try {
        await Message.create(new_message);
    } catch (err) {
        console.log(err);
    }
}

module.exports = receiveMessages;

// const payloadSchema = new Schema({
//   type: String,
//   url: String,
// });
//   {
//     conversation_id: {
//       type: Mongoose.Types.ObjectId,
//       ref: "Conversation",
//       required: true,
//     },
//     sender_id: {
//       type: Number,
//       required: true,
//     },
//     receiver_id: {
//       type: Number,
//       required: true,
//     },
//     message: {
//       type: String,
//       required: false,
//     },
//     payload: {
//       type: payloadSchema,
//       required: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
