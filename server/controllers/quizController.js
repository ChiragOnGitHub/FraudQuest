const Question = require('../models/Question');
const QuizResult = require('../models/QuizResult');

exports.getQuestions = async (req, res) => {
  try {
    const { category, level } = req.params;
    const questions = await Question.find({ category, level });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions' });
  }
};

exports.saveQuizResult = async (req, res) => {
  try {
    const { userId, category, level, score, totalQuestions } = req.body;
    const newResult = new QuizResult({ userId, category, level, score, totalQuestions });
    await newResult.save();
    res.json({ message: 'Result saved' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving quiz result' });
  }
};
