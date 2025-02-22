import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const score = params.get("score");
  const total = params.get("total");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">Quiz Completed!</h1>
      <p className="text-xl mt-4">Your Score: {score} / {total}</p>
      <button
        className="mt-6 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-500"
        onClick={() => navigate("/dashboard/quiz")}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default ResultPage;
