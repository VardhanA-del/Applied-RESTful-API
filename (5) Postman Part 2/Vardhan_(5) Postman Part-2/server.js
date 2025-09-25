const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const Player = require("./models/playerModel");

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error(err));

// Routes

// GET all players
app.get("/api/players", async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single player
app.get("/api/players/:id", async (req, res) => {
  try {
    const player = await Player.findOne({ player_id: req.params.id });
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new player
app.post("/api/players", async (req, res) => {
  const player = new Player(req.body);
  try {
    const newPlayer = await player.save();
    res.status(201).json(newPlayer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH player
app.patch("/api/players/:id", async (req, res) => {
  try {
    const updatedPlayer = await Player.findOneAndUpdate(
      { player_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedPlayer)
      return res.status(404).json({ message: "Player not found" });
    res.json(updatedPlayer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE player
app.delete("/api/players/:id", async (req, res) => {
  try {
    const deletedPlayer = await Player.findOneAndDelete({
      player_id: req.params.id,
    });
    if (!deletedPlayer)
      return res.status(404).json({ message: "Player not found" });
    res.json({ message: "Player deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
