const bcrypt = require("bcrypt");
const User = require("../../model/User");
const handleLogin = require("./loginController");
const validatePassword = require("../../utils/validatePassword");
const customProfilePic = require("../../utils/customProfile");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) return res.status(400).json({ message: "Name must not be empty" });
  if (!validatePassword(password)) {
    return res.status(400).json({
      message:
        "Password must have minimum 8 characters with atleast one uppercase and a special character",
    });
  }

  try {
    const duplicate = await User.findOne({ email: email });
    if (duplicate) {
      return res.sendStatus(409); //conflict
    }

    //encrypt
    const hashedPass = await bcrypt.hash(password, 10);
    //store the new user
    const newUser = {
      name: name,
      email: email,
      password: hashedPass,
      picture: customProfilePic(name),
    };
    await User.create(newUser);

    await handleLogin(req, res);
  } catch (err) {
    res.status(500).json({ message: "Something Went Wrong" });
    console.log(err);
  }
};

module.exports = registerUser;
