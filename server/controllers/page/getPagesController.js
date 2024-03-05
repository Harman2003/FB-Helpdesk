const User = require("../../model/User");
const getLinkedPages = require("../../apis/data/getLinkedPages");

const getPagesController = async (req, res) => {
  const { user_id } = req.query;
  try {
    const user = await User.findById(user_id);
    const access_token = user.user_token;
    const pageList = await getLinkedPages(access_token);
    if (!pageList) {
      res.sendStatus(404);
    }
    res.status(200).json({ pageList });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
};

module.exports = getPagesController;
