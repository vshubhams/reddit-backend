const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    text: { type: String, required: false },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true 
    },
    communityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:false 
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model("post", postSchema);