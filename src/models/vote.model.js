const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
    value: { type: Number, required: false },
    parentId: { type: String, required: true }, // either postId or commentId
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
}, {
    versionKey: false
});
module.exports = mongoose.model("vote", voteSchema);