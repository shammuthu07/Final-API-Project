const Anime = require("../models/Anime");
const axios = require("axios");  // Install: npm install axios

// Existing functions...
const getAnime = async (req, res) => {
  try {
    const anime = await Anime.find();
    res.json(anime);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addAnime = async (req, res) => {
  try {
    const anime = await Anime.create(req.body);
    res.json(anime);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// New function: Search and fetch from Jikan API
const searchAnime = async (req, res) => {
  const query = req.query.q;  // e.g., ?q=naruto
  if (!query) return res.status(400).json({ message: "Query parameter 'q' is required" });

  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}`);
    const data = response.data.data;  // Jikan returns data in 'data' array

    // Map Jikan data to your Anime model structure
    const animeList = data.map(item => ({
      title: item.title,
      image: item.images.jpg.image_url,  // Map to your 'image' field
      synopsis: item.synopsis,
      score: item.score,
      episodes: item.episodes,
      genre: item.genres.map(g => g.name)  // Array of genre names
    }));

    // Optional: Save to your DB (uncomment if you want persistence)
    // await Anime.insertMany(animeList);

    res.json(animeList);  // Return the fetched data
  } catch (err) {
    res.status(500).json({ message: "Error fetching from Jikan API", error: err.message });
  }
};

module.exports = { getAnime, addAnime, searchAnime };