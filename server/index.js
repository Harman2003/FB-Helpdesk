require("dotenv").config();
const express = require("express");
const App = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const connectDB = require("./config/dbConnect");
const AuthRouter = require("./routes/authRoutes");
const verifyJWT = require("./middleware/verifyJWT");

App.use(express.json());
App.use(express.urlencoded({ extended: false }));
App.use(cors(corsOptions));
App.use("/auth", AuthRouter);
App.use(verifyJWT);

connectDB();

mongoose.connection.once("open", async () => {
  console.log("Connected To MONGODB");
  App.listen(PORT, () => {
    console.log("Listening on Port ", PORT);
  });
});