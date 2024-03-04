const User = require("../../model/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) => {
  try {
    const { email, password, remember } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: "Invalid Login" });
    }
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" }); //unauthorized
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      const accessToken = jwt.sign(
        {
          email: foundUser.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10m" }
      );
      const refreshToken = jwt.sign(
        {
          email: foundUser.email,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: remember?"30d":"7d" }
      );

      await User.updateOne(
        { _id: foundUser["_id"] },
        { refreshToken: refreshToken },
        { runValidators: true }
      );

      res.cookie("jwt", refreshToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
      });
      const loginData = {
        accessToken,
        name: foundUser.name,
        email: foundUser.email,
        page_id: foundUser.page_id,
        picture: foundUser.picture,
        // message: "Successfully Logged In",
      };
      console.log(loginData);
      res.json(loginData);
    } else {
      res.status(401).json({ message: "Credentials does not match" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

module.exports = handleLogin;
