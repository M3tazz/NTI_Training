const express = require("express");
const router = express.Router();

router.get("/books", (req, res) => {
  res.json([{ id: 1, title: "Learn Node.js" }]);
});

router.get("/books/:id", (req, res) => {
  res.json({ id: req.params.id, title: "Express Basics" });
});

router.post("/books", (req, res) => {
  res.status(201).json({ message: "Book added" });
});

router.put("/books/:id", (req, res) => {
  res.json({ message: "Book updated" });
});

router.delete("/books/:id", (req, res) => {
  res.json({ message: "Book deleted" });
});

module.exports = router;