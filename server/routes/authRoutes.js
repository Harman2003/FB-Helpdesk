const express = require("express");
const router = express.Router();
const handleLogin = require("../controllers/auth/loginController");
const refreshJWT = require("../controllers/auth/refreshController");
const registerUser = require("../controllers/auth/registerController");
const handleLogout = require("../controllers/auth/logoutController");
const verifyJWT = require("../middleware/verifyJWT");
const verifyAccount = require("../middleware/verifyAccount");

router.get("/refresh", refreshJWT);
router.post("/login", handleLogin);
router.post("/register", registerUser);
router.post("/logout", verifyJWT, verifyAccount, handleLogout);

module.exports = router;
