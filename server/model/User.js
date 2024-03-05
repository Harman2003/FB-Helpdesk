const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const User = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    page_id: {
      type: Number,
      required: false,
      index: {
        unique: true,
        partialFilterExpression: { page_id: { $type: "number" } },
      },
      default: null,
    },
    page_name: String,
    user_token:String,
    page_token: String,
    refreshToken: String,
  },
  {
    timestamps: true,
  }
);

module.exports = Mongoose.model("User", User);
