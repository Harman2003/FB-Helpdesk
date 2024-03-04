const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const Customer = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: false,
  },
  img: {
    type: String,
    required: true,
  },
  timezone: {
    type: String,
    default: null,
  },
  gender: {
    type: String,
    default: null,
  },
});

const Conversation = new Schema(
  {
    customer_id: {
      type: String,
      required:true
    },
    customer: {
      type: Customer,
      required:true
    },
    last_message: {
      type: String,
      required: true,
    },
    seen: {
      type: String,
      default: false,
    },
    user_id: {
      type: Mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedAt: {
      type: Number,
      required:true,
    }
  }
);

module.exports = Mongoose.model("Conversation", Conversation);
