const express = require("express");
const router = express.Router();
const Chatroom = require("../models/chatroom.model");

//new
router.post("/", async (req, res) => {
  const newChatroom = new Chatroom(req.body);

  try {
    const chatroom = await newChatroom.save();
    res.status(200).json({ chatroom });
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const chatroom = await Chatroom.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json({ chatroom });
  } catch (e) {
    res.status(500).json(e);
  }
});

router.delete("/:userId", async (req, res) => {
  try {
    const chatroom = await Chatroom.findByIdAndRemove(req.params.userId);
    res.status(200).json({ deleted: "deleted" });
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
