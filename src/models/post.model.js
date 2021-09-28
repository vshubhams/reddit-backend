const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    text: { type: String, required: false },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true 
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model("post", postSchema);