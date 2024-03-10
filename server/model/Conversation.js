const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;


const Conversation = new Schema(
  {
    customer_id: {
      type: String,
      required:true
    },
    customer_name: {
      type: String,
      required:true
    },
    last_message: {
      type: String,
      required: true,
    },
    seen: {
      type: Number,
      default: 0,
    },
    user_id: {
      type: Mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedAt: {
      type: Date,
      required:true,
    }
  }
);

module.exports = Mongoose.model("Conversation", Conversation);
