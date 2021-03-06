const express = require('express');
const router = express.Router();
const Vote = require("../models/vote.model");

// user can send 3 types of direction
// up, down and remove in params
router.post("/:direction", async function (req, res) {
    let vote = await Vote.findOne({ userId: req.body.userId, parentId: req.body.parentId }); // if user has already voted then we can delete his previous vote
    if (vote) {
       vote= await Vote.findByIdAndDelete(vote._id);
    }

    if (req.params.direction === "remove") return res.status(201).send({message:"Vote removed"}) // if user want to remove his vote either it was up or down then we can return after delete

     vote = await Vote.create({
        userId: req.body.userId,
        parentId: req.body.parentId,
        value: req.params.direction === "up" ? 1 : -1
    });
    res.status(201).json({ vote });
})

router.get("", async function (req, res) {
    const votes = await Vote.find().lean().exec();
    res.status(200).json({ votes });
});

router.get("/count/:parentId", async function (req, res) {
    const votes = await Vote.find().lean().exec();
    let count = 0;
    votes.forEach((vote) => {
        if (vote.parentId === req.params.parentId) {
            count += vote.value;
        }
    });
    return res.status(201).json({ count })
});
// to check if a user is upvoted or down voted or not by userId and parent id
router.get("/check/:parentId/:userId", async function (req, res) {
    const vote = await Vote.find({parentId:req.params.parentId,userId:req.params.userId}).lean().exec();
    return res.status(201).json({ vote });
    
})

//get all votes of a parent by parentID

router.get("/post/:parentId", async function (req, res) {
    const vote = await Vote.find({ parentId: req.params.parentId }).populate("userId").lean().exec();
    return res.status(201).json({ vote });
})

module.exports = router;