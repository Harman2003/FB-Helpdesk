const express = require("express");
const router = express.Router();
const handleLogin = require("../controllers/auth/loginController");
const refreshJWT = require("../controllers/auth/refreshController");
const registerUser = require("../controllers/auth/registerController");

router.get("/refresh", refreshJWT);
router.post("/login", handleLogin);
router.post("/register", registerUser);

module.exports = router;
