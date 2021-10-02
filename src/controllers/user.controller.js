const express = require('express');

const router = express.Router();

const User = require("../models/user.model");
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/file-upload");
const authenticate = require("../middleware/authenticate");

router.get("", async function (req, res) {
    const users = await User.find({},{name:true,profile_url:true,email:true}).lean().exec();
    res.status(200).json({users})
})
// get all user 
router.get("/:id", async function (req, res) {
    const user = await User.findById(req.params.id).lean().exec();
    res.status(200).json({ user });
})

// for changing user profile
router.patch("/:id", authenticate, upload.single("profile_url"), async function (req, res) {
    const  result = await cloudinary.uploader.upload(req.file.path);
    const user = await User.findByIdAndUpdate(req.params.id, {profile_url:result.secure_url}, { new: true });
    res.status(201).json({ user });
})
module.exports = router;