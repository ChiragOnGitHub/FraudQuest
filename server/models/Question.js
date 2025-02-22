const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  level: { type: Number, required: true }, // 0,1,2,...
  question: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: String, required: true },
  info: { type: String, required: true }, // Explanation after selecting an option
  url: {type:String}
});

module.exports = mongoose.model("Question", questionSchema);
