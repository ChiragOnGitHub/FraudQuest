const express = require("express");
const router = express.Router();
const QuizResult = require("../models/QuizResult");

router.post("/results", async (req, res) => {
  try {
    const { userId, level, score, totalQuestions } = req.body;
    if (!userId || level === undefined || score === undefined || !totalQuestions) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    const newResult = new QuizResult({ userId, level, score, totalQuestions });
    await newResult.save();

    res.status(201).json({ message: "Quiz result saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving quiz result", error });
  }
});

router.get("/results", async (req, res) => {
    try {
      const { userId } = req.query;
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      
      // Find quiz results that match the given userId.
      const results = await QuizResult.find({ userId });
      
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: "Error fetching quiz results", error });
    }
  });

module.exports = router;
