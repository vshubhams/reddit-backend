const express = require('express');

const router = express.Router();

const User = require("../models/user.model");

router.get("", async function (req, res) {
    const users = await User.find({},{name:true,profile_url:true}).lean().exec();
    res.status(200).json({users})
})
module.exports = router;