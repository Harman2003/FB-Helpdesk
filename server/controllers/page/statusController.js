const hasSubscribedWebhook = require("../../apis/subscription/hasSubscribedWebhook");
const User = require("../../model/User");

const statusController = async (req, res) => {
  const { user_id } = req.query;
  try {
    const user = await User.findById(user_id);
    const access_token = user.page_token;
    const page_name = user.page_name;
    const page_id = user.page_id;
    const picture = user.picture;
    if (
      !access_token ||
      !page_id ||
      !(await hasSubscribedWebhook(page_id, access_token))
    ) {
      return res.status(200).json({ status: "disconnected" });
    }
    res.status(200).json({ page_id, page_name, picture, status: "connected" });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500).json({ message: err.message, status: "disconnected" });
  }
};

module.exports = statusController;
