const User = require("../model/User");
const jwt = require('jsonwebtoken');

const verifySocket = (socket, next) => {
  const isHandshake = socket.handshake.query.sid===undefined;
  if (!isHandshake) {
    return next();
  }

  const { access_token } = socket.handshake.auth;
  jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return next(new Error("invalid token"));
    }
    const email = decoded.email;
    const user = await User.findOne({ email });
    if (!user) {
      return next(new Error("user not registered"));
    }

    socket.user_id = user._id.toString();
    next();
  });
};

module.exports = verifySocket;
