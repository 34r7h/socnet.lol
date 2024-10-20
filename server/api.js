// routes/api.js
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const hash = (data, iter) => {
  let count = iter || 1;
  if (count > 1) {
    count = count - 1;
    return hash(
      crypto
        .createHash("sha256")
        .update(typeof data !== "string" ? JSON.stringify(data) : data)
        .digest("hex"),
      count
    );
  }
  return crypto
    .createHash("sha256")
    .update(typeof data !== "string" ? JSON.stringify(data) : data)
    .digest("hex");
};

router.post("/signup", (req, res) => {
  console.log("Creating an account", req.body);

  const { email, password } = req.body;
  console.log({ email, password });

  const [authhash, emailhash, passwordhash] = [
    hash({ email, password }, 2),
    hash(email),
    hash(password, 1),
  ];

  // authhash double hashes a provided password hash and email, verifiable from client

  console.log({ authhash });
  const filePath = path.join(__dirname, "auth.json");

  try {
    // Read the existing file
    const data = fs.existsSync(filePath)
      ? fs.readFileSync(filePath, "utf-8")
      : "{}";
    const json = JSON.parse(data);

    // Append the new key safely
    if (json[authhash] && json[authhash] == emailhash) {
      console.log("authenticated", authhash);
      return res.json({
        message: "authenticated",
        user: authhash,
      });
    }

    json[authhash] = emailhash;

    // Write back to the file
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
    console.log("Key appended successfully");
  } catch (error) {
    console.error("Error appending key to auth.json:", error);
  }

  return res.json({
    message: "signed up",
    user: { email, authhash },
  });
});

router.post("/auth", (req, res) => {
  const { email, phone, wallet, contract } = req.body;
  res.json({
    message: "Authentication affirmated",
    user: { email, phone, wallet, contract },
  });
});

router.post("/consume", (req, res) => {
  const { feedconfig, bot } = req.body;
  res.json({ message: "Consume successful", feed: { feedconfig, bot } });
});

router.post("/follow", (req, res) => {
  const { botid, userid } = req.body;
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

router.post("/createbot", (req, res) => {
  console.log(req.body);
  
  const { name, bio, personality, feed, budget, creator } = req.body;
  const filePath = path.join(__dirname, "db.json");
  const datahash = hash({ name, bio, personality, feed, budget, creator })

  try {
    // Read the existing file
    const data = fs.existsSync(filePath)
      ? fs.readFileSync(filePath, "utf-8")
      : "{'bots': {}}";
    const json = JSON.parse(data);

    json.bots[datahash] = { name, bio, personality, feed, budget, creator }

    // Write back to the file
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
    console.log("Bot created successfully");
  } catch (error) {
    console.error("Error creating bot:", error);
  }

  res.json({
    datahash,
    bot: { name, bio, personality, feed, budget, creator },
  });
});

router.post("/respond", (req, res) => {
  const { bot, type, mood, content } = req.body;
  res.json({
    message: "Response created",
    response: { bot, type, mood, content },
  });
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
    share: { post, bot },
  });
});

router.post("/sponsor", (req, res) => {
  const { ad, tx } = req.body;
  res.json({
    message: "Ad money snagged",
    sponsor: { ad, tx },
  });
});

router.post("/metrics", (req, res) => {
  const { type, data } = req.body;
  res.json({
    message: "Metrics derived",
    stats: { type, data },
  });
});

router.post("/chat", async (req, res) => {
  const { prompt, model } = req.body;
  console.log({ prompt, model });

  // Validate that the message exists
  if (!prompt) {
    return res.status(400).json({ error: "Message is required" });
  }
  // Validate that the message exists
  if (!model) {
    return res.status(400).json({ error: "Model is required" });
  }

  try {
    // Send the message to Ollama running locally
    const ollamaResponse = await axios.post(
      "http://localhost:11434/api/generate",
      {
        prompt,
        model,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("sent chat", await ollamaResponse.data);

    // Send Ollama's response back to the client
    return res.json({
      message: "Chat response received",
      response: await ollamaResponse.data,
    });
  } catch (error) {
    console.error("Error communicating with Ollama:", error);
    return res.status(500).json({ error: "Failed to communicate with Ollama" });
  }
});

module.exports = router;
