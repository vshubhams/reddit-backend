const express = require('express');

const router = express.Router();

const Post = require("../models/post.model");
const authenticate = require("../middleware/authenticate");
const upload = require("../middleware/file-upload")


router.post("", authenticate, upload.single("imageUrl"), async function (req, res) {
    const post = await Post.create({
        text: req.body.text,
        userId: req.body.userId,
        imageUrl: req.file.path
    });
    res.status(201).json({ post });
});

router.get("", async function (req, res) {
    const posts = await Post.find().lean().exec();
    res.status(200).json({ posts });
})
router.get("/:id", async function (req, res) {
    const post = await Post.findById(req.params.id)
    res.status(200).json({ post });
})

module.exports = router;