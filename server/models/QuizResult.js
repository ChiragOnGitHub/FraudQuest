const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  level: { type: Number, required: true }, // e.g., 0, 1, 2
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("QuizResult", quizResultSchema);
