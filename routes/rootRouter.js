const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/new-page(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "..", 'views', 'new-page.html'))
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "index.html"))
});

module.exports = router;