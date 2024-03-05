require("dotenv").config();
const express = require("express");
const App = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const connectDB = require("./config/dbConnect");
const verifyJWT = require("./middleware/verifyJWT");
const verifyAccount = require("./middleware/verifyAccount");
const authRouter = require("./routes/authRoutes");
const pageRouter = require("./routes/pageRoutes");
const chatRouter = require("./routes/chatRoutes");
const webhookRouter = require("./routes/webhookRoutes");

App.use(
  express.json({
    limit: "5mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
App.use(express.urlencoded({ extended: false }));
App.use(cookieParser());
App.use(cors(corsOptions));
App.use("/auth", authRouter);
App.use("/webhook", webhookRouter);
App.use(verifyJWT, verifyAccount);
App.use("/page", pageRouter);
App.use("/chat", chatRouter);

connectDB();

mongoose.connection.once("open", async () => {
  console.log("Connected To MONGODB");
  App.listen(PORT, () => {
    console.log("Listening on Port ", PORT);
  });
});
