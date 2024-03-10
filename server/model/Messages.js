const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const payloadSchema = new Schema({
  type: String,
  url: String,
});

const Message = new Schema(
  {
    mid: {
      type: String,
      unique:true,
    },
    conversation_id: {
      type: Mongoose.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    sender_id: {
      type: Number,
      required: true,
    },
    receiver_id: {
      type: Number,
      required: true,
    },
    mode: {
      type: String,
      enum: ['self', 'other'],
      required:true
    },
    message: {
      type: String,
      required: false,
    },
    payload: {
      type: payloadSchema,
      required: false,
    },
    createdAt: {
      type: Date,
      required:true
    }
  },
);

module.exports = Mongoose.model("Message", Message);
