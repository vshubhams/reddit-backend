const express = require('express');
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const Comment = require("../models/comment.model");

router.post("",authenticate, async function (req, res) {
    const comment = await Comment.create(req.body);
    res.status(201).json({ comment });
});

router.get("", async function (req, res) {
    const comment = await Comment.find();
    res.status(200).json({ comment });
});

router.get("/:id", async function (req, res) {
    const comment = await Comment.find({postId:req.params.id});
    res.status(200).json({ comment });
});

module.exports = router;