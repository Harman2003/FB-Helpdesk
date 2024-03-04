const User = require("../../model/User");
const getPageProfile = require("../../apis/profiles/getPageProfile");
const subscribeWebhook = require("../../apis/subscription/subscribeWebhook");

const connectController = async (req, res) => {
    const {page_name, page_id } = req.body;
    const { user_id } = req.query;
    const user_token = req.headers["authorization"];

    try {
        const profile = await getPageProfile(page_name, page_id, user_token);
        await subscribeWebhook(page_id, page_token);

        const user = await User.findById(user_id);
        user.page_id = page_id;
        user.page_name = profile.page_name;
        user.page_token = profile.page_token;
        if (picture) user.picture = profile.picture;
        await user.save();

        res.status(200).json({ message: "connection success" });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

module.exports = connectController;


//       type: String,
//       required: true,
//     },
//     page_id: {
//       type: Number,
//       required: false,
//       index: {
//         unique: true,
//         partialFilterExpression: { page_id: { $type: "number" } },
//       },
//       default: null,
//     },
//     page_name: String,
//     page_token: String,