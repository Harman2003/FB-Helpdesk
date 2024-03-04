const User = require("../model/User");
const verifyAccount = async (req, res, next) => {
  try {
    const { email } = req.query;
    const user = await User.exists({ email: email });
    if (!user) {
      return res.status(404).json({ message: "account not found" });
    } else {
      req.query.user_id = user._id;
      next();
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

module.exports = verifyAccount;
