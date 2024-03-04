const User = require("../../model/User");
const unsubscribeWebhook = require("../../apis/subscription/unsubscribeWebhook");
const customProfilePic = require("../../utils/customProfile");

const disconnectController = async (req, res) => {
  const { user_id } = req.query;

  try {
    const user = await User.findById(user_id);
    await unsubscribeWebhook(user.page_id, user.page_token);

    user.page_id = null;
    user.page_name = null;
    user.page_token = null;
    user.picture = customProfilePic(user.name);
    await user.save();

    res.status(200).json({ message: "Page disconnected" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = disconnectController;
