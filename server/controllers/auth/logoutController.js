const User = require("../../model/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogout = async (req, res) => {
  try {
    const { user_id } = req.query;
    
      const foundUser = await User.findById(user_id);
      foundUser.page_id = null;
      foundUser.page_name = null;
      foundUser.page_token = null;
      foundUser.user_token = null;
      foundUser.refreshToken = null;
      await foundUser.save();
      return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

module.exports = handleLogout;
