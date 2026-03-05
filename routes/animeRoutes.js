const router = require("express").Router();
const c = require("../Controllers/animeController");

router.get("/", c.getAnime);  // Your existing local anime
router.post("/", c.addAnime);
router.get("/search", c.searchAnime);  // New: Search from Jikan

module.exports = router;