const hasSubscribedWebhook = require("../../apis/subscription/hasSubscribedWebhook");
const User = require("../../model/User");

const statusController = async (req, res) => {
  const { user_id } = req.query;
  try {
    const user = await User.findById(user_id);
    const access_token = user.page_token;
    const page_id = user.page_id;

    if (
      !access_token ||
      !page_id ||
      !(await hasSubscribedWebhook(page_id, access_token))
    ) {
      return res.status(200).json({ status: "disconnected" });
    }
    res.status(200).json({ status: "connected" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500).json({message:err.message});
  }
};

module.exports = statusController;
