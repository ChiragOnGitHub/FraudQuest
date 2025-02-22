const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

router.get("/questions/:level", async (req, res) => {
  try {
    const level = parseInt(req.params.level);
    const questions = await Question.find({ level });

    if (!questions.length) {
      return res.status(404).json({ message: "No questions found for this level" });
    }

    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
