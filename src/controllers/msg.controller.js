const express = require("express");
const router = express.Router();
const Msg = require("../models/msg.model");

//add
router.post("/", async (req, res) => {
  const newMsg = new Msg(req.body);

  try {
    const msg = await newMsg.save();
    res.status(200).json({ msg });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.get("/:chatroomId", async (req, res) => {
  try {
    const allMsg = await Msg.find({
      chatRoomId: req.params.chatroomId,
    });
    res.status(200).json({ allMsg });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
