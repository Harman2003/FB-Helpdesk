const createConversation = require("../conversation/createConversation");
const receiveMessages = require("../messages/receiveMessage");
const parseBodyRequest = require("../../../utils/parseBodyRequest");
const Message = require("../../../model/Messages");

const webhookController = async (req, res) => {
  if (req.body.object === "page") {
    try {
      const payload = parseBodyRequest(req.body.entry);
      const isMessageExisting = await Message.exists({
        mid: payload.message.mid,
      });
      if (!isMessageExisting) {
        const conversation_id = await createConversation(payload);
        if (conversation_id) {
          await receiveMessages(payload, conversation_id);
          // console.log(payload, conversation_id);
        }
      }
    } catch (err) {
      console.log(err);
    }
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
};

module.exports = webhookController;

// Body:{
//    "object": "page",
//    "entry": [
//       {
//          "id": "256806200844123",
//          "time": 1709466169456,
//          "messaging": [
//             {
//                "sender": {
//                   "id": "7282923945119148"
//                },
//                "recipient": {
//                   "id": "256806200844123"
//                },
//                "timestamp": 1709466168933,
//                "message": {
//                   "mid": "m_7zP1yF3AqWRFDh5zjGhHWjAajrQtyEOfQ1cOqm9DqdkKqFAh9WBO1RJPAof7uiit4yRDMODp3oJIhIDmCXqf6g",
//                   "attachments": [
//                      {
//                         "type": "image",
//                         "payload": {
//                            "url": "https://cdn.fbsbx.com/v/t59.2708-21/378039059_133043493219667_2630790871816840651_n.gif?_nc_cat=100&ccb=1-7&_nc_sid=cf94fc&_nc_ohc=3opO5zaZWQ8AX9bs778&_nc_ht=cdn.fbsbx.com&oh=03_AdRJ9L48dy8XNRsPrJQ4xq8_GxF0EsnVEEmjSjGo5qPK5w&oe=65E61B4E"
//                         }
//                      }
//                   ]
//                }
//             }
//          ]
//       }
//    ]
// }
