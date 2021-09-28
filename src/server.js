const express = require('express');
const app = express();
const connect = require("./config/db");
app.use(express.json());


const port = process.env.PORT || 3001
app.listen(port, async function () {
    try {
        await connect();
        console.log("Listen to port 3001");
    }
    catch (error) {
        console.log("error",error);
    }
});