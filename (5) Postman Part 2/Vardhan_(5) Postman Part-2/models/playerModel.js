const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  player_id: Number,
  name: String,
  nationality: String,
  age: Number,
  club: String,
  shirt_number: Number,
  matches: Number,
  goals: Number,
  assists: Number,
  position: String,
  position_category: String,
});

module.exports = mongoose.model("Player", playerSchema, "FootballPlayers");
