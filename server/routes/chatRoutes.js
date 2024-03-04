const express = require("express");
const router = express.Router();
const getConversations = require("../controllers/chat/conversation/getConversations");
const deleteConversations = require("../controllers/chat/conversation/deleteConversation");
const getMessages = require("../controllers/chat/messages/getMessages");
const sendMessages = require("../controllers/chat/messages/sendMessage");


router.get("/conversations", getConversations);
router.delete("/conversations", deleteConversations);
router.get("/messages", getMessages);
router.post("/messages", sendMessages);

module.exports = router;
