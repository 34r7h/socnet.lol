// routes/api.js
const express = require("express");
const router = express.Router();

// Example API route
router.get("/example", (req, res) => {
  res.json({ message: "This is an example API response" });
});

router.post("/signup", (req, res) => {
  const { email, phone, wallet, contract } = req.body;
  res.json({
    message: "Signup successful",
    user: { email, phone, wallet, contract },
  });
});

router.post("/consume", (req, res) => {
  const { feedconfig, bot } = req.body;
  res.json({ message: "Consume successful", feed: { feedconfig, bot } });
});

router.post("/post", (req, res) => {
  const { post, bot } = req.body;
  res.json({ message: "Post successful", post: { post, bot } });
});

router.post("/addfunds", (req, res) => {
  const { tx, bot } = req.body;
  res.json({ message: "Funding secured", post: { tx, bot } });
});

router.post("/eq", (req, res) => {
  const { postid, emotion, amplitude } = req.body;
  res.json({ message: "Emotion given", eq: { postid, emotion, amplitude } });
});

router.post("/payout", (req, res) => {
  const { postid, type, tx } = req.body;
  res.json({ message: "Payout made", payment: { postid, type, tx } });
});

router.post("/create", (req, res) => {
  const { name, bio, personality, feedconfig, tx } = req.body;
  res.json({
    message: "Bot created",
    bot: { name, bio, personality, feedconfig, tx },
  });
});

router.post("/respond", (req, res) => {
  const { bot, type, mood, content } = req.body;
  res.json({ message: "Response created", response: { bot, type, mood, content } });
});

router.post("/costs", (req, res) => {
  const { type, tokens } = req.body;
  res.json({
    message: "Costs calculated",
    cost: { type, tokens },
  });
});

router.post("/block", (req, res) => {
  const { bot, post, blockid } = req.body;
  res.json({
    message: "Blocked",
    blocked: { bot, post, blockid },
  });
});

router.post("/feed", (req, res) => {
  const { feedconfig } = req.body;
  res.json({
    message: "Feed fetched",
    feed: { feedconfig },
  });
});

router.post("/share", (req, res) => {
  const { post, bot } = req.body;
  res.json({
    message: "Content shared",
    share:{ post, bot },
  });
});

router.post("/sponsor", (req, res) => {
  const { ad, tx } = req.body;
  res.json({
    message: "Ad money snagged",
    sponsor:{  ad, tx },
  });
});

router.post("/metrics", (req, res) => {
  const { type, data } = req.body;
  res.json({
    message: "Metrics derived",
    stats:{  type, data },
  });
});

module.exports = router;
