const mongoose = require("mongoose");

const msgSchema = new mongoose.Schema(
  {
    chatRoomId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "chatRoom",
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model("msg", msgSchema);
