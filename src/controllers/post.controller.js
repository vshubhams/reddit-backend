const express = require('express');

const router = express.Router();
const cloudinary = require("../utils/cloudinary");

const Post = require("../models/post.model");
const authenticate = require("../middleware/authenticate");
const upload = require("../middleware/file-upload")


router.post("", authenticate, upload.single("imageUrl"), async function (req, res) {
    const  result = await cloudinary.uploader.upload(req.file.path);
    // console.log('result:', result)
    const post = await Post.create({
        text: req.body.text,
        userId: req.body.userId,
        communityId: req.body.communityId,
        imageUrl: result.secure_url
    });
    res.status(201).json({ post });
});

router.get("", async function (req, res) {
    const posts = await Post.find().populate("userId").populate("communityId").sort({_id:-1}).lean().exec();
    res.status(200).json({ posts });
})

// getting all post of a user by userId
router.get("/user/:id", async function (req, res) {
    const post = await Post.find({userId:req.params.id}).populate("userId").lean().exec();
    res.status(200).json({ post });
})

// getting all post of a user by userId
router.get("/community/:id", async function (req, res) {
    const post = await Post.find({communityId:req.params.id}).populate("userId").lean().exec();
    res.status(200).json({ post });
})
// getting post by postId
router.get("/:id", async function (req, res) {
    const post = await Post.findById(req.params.id).populate("userId").lean().exec();
    res.status(200).json({ post });
})

module.exports = router;