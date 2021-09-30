const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const cloudinary = require("../utils/cloudinary");

const newToken = (user) => {
    return jwt.sign({user:user}, process.env.JWT_SECRET_KEY);
}

const register = async (req, res) => {
    
    let user;
    try {
        user = await User.findOne({ name: req.body.name }).lean().exec();
        if (user) return res.status(400).send({ status: "failed", message: "Username is already exists. Try another" });
        
        user = await User.findOne({ email: req.body.email }).lean().exec();
        
        if (user) return res.status(400).send({ status: "failed", message: "Please try with a different email" });
        
        let result={};
        try {
            result = await cloudinary.uploader.upload(req.file.path);
        }
        catch (err) {
            // console.log(err);
        }

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password:req.body.password,
            profile_url:result.secure_url || ""
        });
        
        if (!user) return res.status(500).send({ status: "failed", message: "Please try again later" });

        const token = newToken(user);

        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            profile_url: user.profile_url,
        }
        res.status(201).json({ user, token });
    }
    catch (err) {
        // console.log(err);
        return res.status(500).send({ status: "Failed", message: "Please try again later" })
    }
}

const login = async function (req, res) {

    try {
        let user = await User.findOne({ email: req.body.email }).exec();
        if (!user) return res.status(400).send({ status: "failed", message: "Please try with a different email or password" });

        const match = await user.checkPassword(req.body.password);

        if(!match) return res.status(400).send({ status: "failed", message: "Please try with diffenrent email or password" });

        const token = newToken(user);
        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            profile_url: user.profile_url,
        }
        return res.status(201).json({ user,token });
    }
    catch {
        return res.status(500).send({status: "failed",message: "Please try again later"});
    }
}

module.exports = {
    register,
    login
}