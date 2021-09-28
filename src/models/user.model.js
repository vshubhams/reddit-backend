const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    profile_url: { type: String, required: true },
    password: { type: String, required: true, minlength:8},
    roles: [{ type: String, required: false}]
}, {
    timestamps: true,
    versionKey: false
});

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();

    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    next();
})

userSchema.methods.checkPassword = function (password) {
    const passwordHash = this.password;

    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, function (err, same) {
            if (err) return reject(err);
            resolve(same);
        })
    })
}

const User = mongoose.model("user", userSchema);
module.exports = User;