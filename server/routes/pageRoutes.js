const express = require("express");
const getPagesController = require("../controllers/page/getPagesController");
const connectController = require("../controllers/page/connectController");
const disconnectController = require("../controllers/page/disconnectController");
const statusController = require("../controllers/page/statusController");
const router = express.Router();

router.get("/linked", getPagesController)
router.get("/status", statusController)
router.post("/connect", connectController);
router.delete("/disconnect", disconnectController);

module.exports = router;
