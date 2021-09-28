const express = require('express');
require("dotenv").config();
const app = express();
const connect = require("./config/db");
app.use(express.json());

const postController = require("./controllers/post.controller");
const { register, login } = require("./controllers/auth.controller");

const upload = require("./middleware/file-upload");


app.post("/register", upload.single("profile_url"), register);
app.post("/login", login);
app.use("/posts", postController);

const port = process.env.PORT
app.listen(port, async function () {
    try {
        await connect();
        console.log("Listen to port 3001");
    }
    catch (error) {
        console.log("error",error);
    }
});