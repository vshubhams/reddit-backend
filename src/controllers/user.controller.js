const express = require('express');

const router = express.Router();

const User = require("../models/user.model");

router.get("", async function (req, res) {
    const users = await User.find({},{name:true,profile_url:true,email:true}).lean().exec();
    res.status(200).json({users})
})
router.get("/:id", async function (req, res) {
    const user = await User.findById(req.params.id).lean().exec();
    res.status(200).json({ user });
})
module.exports = router;