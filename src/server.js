const express = require("express");
require("dotenv").config();
const app = express();
const connect = require("./config/db");
app.use(express.json());
const Msg = require("./models/msg.model");

const postController = require("./controllers/post.controller");
const userController = require("./controllers/user.controller");
const commentController = require("./controllers/comment.controller");
const voteController = require("./controllers/vote.controller");
const communityController = require("./controllers/community.controller");
const { register, login } = require("./controllers/auth.controller");
const chatroomController = require("./controllers/chatroom.controller");
const msgController = require("./controllers/msg.controller");

const upload = require("./middleware/file-upload");

app.post("/register", upload.single("profile_url"), register);
app.post("/login", login);
app.use("/users", userController);
app.use("/posts", postController);
app.use("/comments", commentController);
app.use("/votes", voteController);
app.use("/community", communityController);
app.use("/chatroom", chatroomController);
app.use("/msg", msgController);

const port = process.env.PORT || 3001;
const server = app.listen(port, async function () {
  try {
    await connect();
    console.log(`Listen to port ${port}`);
  } catch (error) {
    console.log("error", error);
  }
});

const io = require("socket.io")(server);

let user = [];
const addUser = (userId, socketId) => {
  // !user.some((user) => user.userId === userId) && user.push({ userId, socketId });

  let flag = false;
  for (var i = 0; i < user.length; i++) {
    if (user[i].userId === userId) {
      flag = true;
    }
  }

  if (!flag) {
    user.push({ userId, socketId });
  }
};

const removeAddedUser = (socketId) => {
  user = user.filter((u) => u.socketId !== socketId);
};

const getUser = (userId) => {
  console.log(user, "user");
  return user.find((u) => u.userId === userId);
};

io.on("connection", (socket) => {
  //connected
  console.log("a user connected");
  io.emit("welcome", "hello user from socket");

  // take userId and socket from user
  socket.on("addedUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", user);
  });

  //send Message and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const userParticular = getUser(receiverId);
    console.log(userParticular);
    io.to(userParticular?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //disconnected
  socket.on("disconnect", () => {
    console.log("user disconected");
    removeAddedUser(socket.id);
    io.emit("getUsers", user);
  });
});
