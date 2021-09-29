const express = require('express');
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const Comment = require("../models/comment.model");

router.post("",authenticate, async function (req, res) {
    const comment = await Comment.create(req.body);
    res.status(201).json({ comment });
});

module.exports = router;