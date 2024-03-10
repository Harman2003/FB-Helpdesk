const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const Customer = new Schema({
  customer_id: {
    type: String,
    required: true,
  },
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

module.exports = Mongoose.model("Customer", Customer);
