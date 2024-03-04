const express = require("express");
const router = express.Router();
const webhookController = require("../controllers/chat/webhook/webhookController");
const validateWebhookController = require("../controllers/chat/webhook/validateWebhookController");
const verifyRequestSignature = require("../middleware/verifyRequestSignature");

//Facebook Messenger Webhook
router.post("/", verifyRequestSignature, webhookController);
router.get("/*", validateWebhookController);


module.exports = router;
