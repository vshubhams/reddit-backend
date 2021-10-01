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
});

// getting community by communityId
router.get("/:id", async function (req, res) {
    const community = await Community.findById(req.params.id).populate("userId").lean().exec();
    res.status(200).json({ community });
})

// getting all community of a user by userId
router.get("/user/:id", async function (req, res) {
    const communities = await Community.find({userId:req.params.id}).populate("userId").lean().exec();
    res.status(200).json({ communities });
})

module.exports = router;
