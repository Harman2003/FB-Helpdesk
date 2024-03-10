const User = require("../../model/User");
const getPageProfile = require("../../apis/data/getPageProfile");
const subscribeWebhook = require("../../apis/subscription/subscribeWebhook");
const customProfile = require('../../utils/customProfile');

const connectController = async (req, res) => {
  const { user_id, mode, user_token } = req.query;
  
  try {
    const user = await User.findById(user_id);
    if (mode === "authorize") {
      user.user_token = user_token;
      await user.save();
      res.sendStatus(200);
    } else {
      const { page_name, page_id } = req.body;

      const foundUser = await User.exists({ page_id });
      if (foundUser) {
        return res.status(409).json({ message: "Page already in use" });
      }
      const profile = await getPageProfile(page_name, page_id, user.user_token);
      user.page_id = page_id;
      user.page_name = profile.page_name;
      user.page_token = profile.page_token;
      user.picture = profile.picture || customProfile(user.name);
      await user.save();
      await subscribeWebhook(page_id, profile.page_token);

      res.status(200).json({ message: "connection success" });
    }
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
};

module.exports = connectController;
