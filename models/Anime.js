const mongoose = require("mongoose");

const animeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },  // URL string
  synopsis: String,
  score: Number,
  episodes: Number,
  genre: [String]
});

module.exports = mongoose.model("AnimeCurd", animeSchema);