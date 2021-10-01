const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    name: { type: String, required: false },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true 
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model("community", commentSchema);