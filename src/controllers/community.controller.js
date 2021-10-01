const express = require('express');

const router = express.Router();
const authenticate = require("../middleware/authenticate");
const Community = require('../models/community.model');

router.post("", authenticate, async function (req, res) {
    const community = await Community.create(req.body);
    res.status(201).json({ community });
});

router.get("", async function (req, res) {
    const communities = await Community.find().populate("userId").lean().exec();
    res.status(200).json({ communities });
})

module.exports = router;
