const { Server } = require("socket.io");
const corsOptions = require("./config/corsOptions");
const verifySocket = require("./middleware/verifySocket");

let io; //global io instance
const socketConnection = (server) => {
  //initialisation
  io = new Server(server, { cors: corsOptions });
  //JWT Based Authentication
  io.use(verifySocket);
  //connection setup
  io.on("connection", (socket) => {
    const user_id = socket.user_id;
    socket.join(user_id);
    socket.on("disconnect", () => {
      console.info(`Client disconnected [id=${socket.user_id}]`);
    });
  });
};

const newConversationNotification = async (id, new_conversation) => {
  await io.to(id).emit("new_conversation", new_conversation);
};

const updatedConversationNotification = async (id, updated_conversation, callback) => {
  await io.to(id).timeout(5000).emit("update_conversation", updated_conversation, callback);
};

const newMessageNotification = async (id, new_message) => {
  await io.to(id).emit("new_message", new_message);
};

module.exports = {
  socketConnection,
  newConversationNotification,
  updatedConversationNotification,
  newMessageNotification,
};
