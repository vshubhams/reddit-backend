const express = require('express');
require("dotenv").config();
const app = express();
const connect = require("./config/db");
app.use(express.json());

const postController = require("./controllers/post.controller");
const userController = require("./controllers/user.controller");
const commentController = require("./controllers/comment.controller");
const { register, login } = require("./controllers/auth.controller");

const upload = require("./middleware/file-upload");


app.post("/register", upload.single("profile_url"), register);
app.post("/login", login);
app.use("/users", userController);
app.use("/posts", postController);
app.use("/comments", commentController);


const port = process.env.PORT || 3001
app.listen(port, async function () {
    try {
        await connect();
        console.log(`Listen to port ${port}`);
    }
    catch (error) {
        console.log("error",error);
    }
});