import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const QuizPage = () => {
  const { user } = useSelector((state) => state.profile);
  const { levelnum } = useParams();
  const navigate = useNavigate();
  const mode = parseInt(levelnum, 10); // mode 0, 1, or 2

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [score, setScore] = useState(0);

  // Timer state (for mode 0 and mode 2)
  const [timer, setTimer] = useState(0);
  const [timerStopped, setTimerStopped] = useState(false);

  // Lifelines (for mode 2 only)
  const [lifelines, setLifelines] = useState({
    stopTimer: false,
    hint: false,
    remove: false,
  });
  const [hintText, setHintText] = useState("");
  const [removedOption, setRemovedOption] = useState(null);

  // State to toggle alert color when timer is low
  const [alertToggle, setAlertToggle] = useState(false);

  // Toggle alert color every 0.5 seconds when timer < 5 seconds
  useEffect(() => {
    if (timer < 5 && timer > 0) {
      const toggleInterval = setInterval(() => {
        setAlertToggle((prev) => !prev);
      }, 500);
      return () => clearInterval(toggleInterval);
    } else {
      setAlertToggle(false);
    }
  }, [timer]);

  // Next question handler moved above the timer effect.
  const handleNextQuestion = useCallback(async (timeExpired) => {
    // timeExpired: true if auto-called when timer runs out.
    if (currentIndex + 1 >= questions.length) {
      // Optionally, submit result via API to store in QuizResult schema
      try {
        const userId = user; // Replace with actual user ID from Redux/auth if needed
        await axios.post("http://192.168.16.33:4000/api/v1/quiz/results", {
          userId,
          level: mode,
          score,
          totalQuestions: questions.length,
        });
      } catch (error) {
        console.error("Error saving quiz result:", error);
      }
      navigate(`/dashboard/quiz/result?score=${score}&total=${questions.length}`);
    } else {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setShowInfo(false);
      setTimerStopped(false);
      setHintText("");
      setRemovedOption(null);
    }
  }, [currentIndex, questions, navigate, score, mode, user]);

  // Fetch questions based on mode (level) and randomly sample a set number based on level:
  // Level 0: 10 questions, Level 1: 20 questions, Level 2: 15 questions.
  useEffect(() => {
    axios
      .get(`http://192.168.16.33:4000/api/v1/quiz/questions/${mode}`)
      .then((res) => {
        const allQuestions = res.data;
        let sampleCount = 10; // default for level 0
        // if (mode === 1) sampleCount = 20;
        // else if (mode === 2) sampleCount = 15;
        // Shuffle questions randomly
        const shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffledQuestions.slice(0, sampleCount);
        setQuestions(selectedQuestions);
      })
      .catch((err) => console.error(err));
  }, [mode]);

  // Set up timer for mode 0 (15 sec) and mode 2 (30 sec)
  useEffect(() => {
    if ((mode === 0 || mode === 2) && !timerStopped) {
      const initialTime = mode === 0 ? 15 : 30;
      setTimer(initialTime);
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleNextQuestion(true); // time expired; move on, treat as unanswered
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, mode, timerStopped, handleNextQuestion]);

  if (!questions.length) {
    return <div className="text-center text-white">Loading questions...</div>;
  }

  const currentQuestion = questions[currentIndex];

  // For mode 2, if a lifeline has removed an option, filter it out.
  const optionsToDisplay =
    mode === 2 && removedOption
      ? currentQuestion.options.filter((opt) => opt !== removedOption)
      : currentQuestion.options;

  // Handler for when an option is clicked
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === currentQuestion.answer) {
      setScore(score + 1);
    }
    // For level 0 and level 2, immediately move to next question
    if (mode === 0 || mode === 2) {
      setTimeout(() => {
        handleNextQuestion(false);
      }, 500);
    } else {
      setShowInfo(true);
    }
  };

  // Lifeline handlers (for mode 2)
  const handleStopTimer = () => {
    if (!lifelines.stopTimer) {
      setLifelines((prev) => ({ ...prev, stopTimer: true }));
      setTimerStopped(true);
    }
  };

  const handleHint = () => {
    if (!lifelines.hint) {
      setLifelines((prev) => ({ ...prev, hint: true }));
      setHintText(currentQuestion.hint || "No hint available.");
    }
  };

  const handleRemoveOption = () => {
    if (!lifelines.remove) {
      setLifelines((prev) => ({ ...prev, remove: true }));
      const incorrectOptions = currentQuestion.options.filter(
        (opt) => opt !== currentQuestion.answer
      );
      if (incorrectOptions.length > 0) {
        setRemovedOption(incorrectOptions[0]);
      }
    }
  };

  // Render media if provided in the question
  const renderMedia = () => {
    if (currentQuestion.mediaUrl) {
      if (currentQuestion.mediaType === "image") {
        return (
          <img
            src={currentQuestion.mediaUrl}
            alt="media"
            className="w-64 h-64 object-contain my-4 rounded-lg shadow-md"
          />
        );
      }
      if (currentQuestion.mediaType === "audio") {
        return (
          <audio controls src={currentQuestion.mediaUrl} className="my-4" />
        );
      }
    }
    return null;
  };

  return (
    <div className="flex min-h-screen bg-richblack-900 text-white p-6 flex-col items-center relative">
      {/* Timer display for mode 0 and mode 2 */}
      {(mode === 0 || mode === 2) && (
        <div
          className={`absolute top-4 right-4 text-2xl font-bold px-4 py-2 rounded-lg shadow-lg ${
            timer < 5
              ? alertToggle
                ? "bg-red-600"
                : "bg-yellow-500"
              : "bg-richblue-700"
          }`}
        >
          Timer: {timer}
        </div>
      )}

      {/* Lifelines for mode 2 - Positioned on the left side */}
      {mode === 2 && (
  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-6 p-4">
    <button
      onClick={handleStopTimer}
      disabled={lifelines.stopTimer}
      className={`w-40 h-16 rounded-lg flex items-center justify-center font-bold transition-transform hover:scale-105 ${
        lifelines.stopTimer
          ? "bg-richblack-500 text-richblack-200"
          : "bg-yellow-500 text-black"
      }`}
    >
      Time Freeze
    </button>
    <button
      onClick={handleHint}
      disabled={lifelines.hint}
      className={`w-40 h-16 rounded-lg flex items-center justify-center font-bold transition-transform hover:scale-105 ${
        lifelines.hint
          ? "bg-richblack-500 text-richblack-200"
          : "bg-green-500 text-black"
      }`}
    >
      Sneak Peek
    </button>
    <button
      onClick={handleRemoveOption}
      disabled={lifelines.remove}
      className={`w-40 h-16 rounded-lg flex items-center justify-center font-bold transition-transform hover:scale-105 ${
        lifelines.remove
          ? "bg-richblack-500 text-richblack-200"
          : "bg-red-500 text-black"
      }`}
    >
      Narrow Down
    </button>
  </div>
)}


      {/* Main Quiz Content */}
      <main className="flex flex-col items-center justify-center px-4 w-full max-w-4xl">
        {/* Fixed height for question to keep options position constant */}
        <h1 className="text-2xl font-bold text-center mb-4 text-white min-h-[80px]">
          {currentQuestion.question}
        </h1>
        {renderMedia()}

        {/* Hint display (shows only if lifeline hint is activated) */}
        {lifelines.hint && hintText && (
          <div className="mb-4 text-lg text-green-300">Hint: {hintText}</div>
        )}

        {/* Options Container */}
        <div className="flex flex-col gap-4 w-full max-w-lg mx-auto mt-10">
          {optionsToDisplay.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionClick(option)}
              disabled={selectedOption !== null}
              className={`p-4 rounded-lg font-semibold text-lg transition-all shadow-md border-2 border-transparent w-full hover:shadow-xl ${
                selectedOption
                  ? option === currentQuestion.answer
                    ? "bg-green-500 border-green-700 animate-pulse"
                    : "bg-red-500 border-red-700 animate-shake"
                  : "bg-blue-600 hover:bg-blue-400 hover:scale-105 transition-transform"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </main>

      {/* Description popup for mode 1 (only) */}
      {showInfo && mode === 1 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md p-4">
          <div className="relative bg-gradient-to-br from-pink-500 to-blue-600 p-12 rounded-2xl shadow-2xl transform scale-95 transition-transform duration-300 animate-pop w-full max-w-xl">
          
            <p className="text-lg font-medium text-white text-center">
              {currentQuestion.info}
            </p>
            <div className="flex justify-center mt-6">
              <button
                onClick={() => handleNextQuestion(false)}
                className="px-6 py-2 bg-yellow-300 text-white font-bold rounded-lg shadow-lg hover:bg-yellow-400 transition-transform hover:scale-105"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
