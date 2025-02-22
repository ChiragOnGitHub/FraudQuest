import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const PerformancePage = () => {
  const { user } = useSelector((state) => state.profile);
  const userId = user._id;
  console.log(userId);

  const [quizResults, setQuizResults] = useState([]);

  useEffect(() => {
    // Fetch all quiz results for the current user.
    axios
      .get(`http://192.168.16.33:4000/api/v1/quiz/results?userId=${userId}`)
      .then((res) => {
        setQuizResults(res.data);
      })
      .catch((err) => console.error("Error fetching quiz results:", err));
  }, [userId]);

  // Levels defined in your schema
  const levels = [0, 1, 2];

  // Process data for each level
  const levelMetrics = levels.map((level) => {
    // Filter the results for the given level.
    const results = quizResults.filter((r) => r.level === level);
    const attempts = results.length;
    // Calculate the average score percentage for each level.
    const avgScorePercentage =
      attempts > 0
        ? results.reduce(
            (sum, curr) => sum + (curr.score / curr.totalQuestions) * 100,
            0
          ) / attempts
        : 0;
    return {
      level,
      attempts,
      avgScorePercentage,
      results,
    };
  });

  // Data for the bar chart (Average Score by Level)
  const barChartData = {
    labels: levels.map((level) => `Level ${level}`),
    datasets: [
      {
        label: "Average Score (%)",
        data: levelMetrics.map((m) =>
          parseFloat(m.avgScorePercentage.toFixed(2))
        ),
        backgroundColor: ["#38A169", "#3182CE", "#D53F8C"],
      },
    ],
  };

  // Update options with maintainAspectRatio disabled for custom sizing.
  const barChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Average Score by Level",
      },
    },
  };

  // Create a function that returns a Line chart for the score progression of a level.
  const renderProgressionChart = (level) => {
    const { results } = levelMetrics.find((m) => m.level === level);
    // Sort results by date to show progression.
    const sortedResults = results.slice().sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    // Labels: formatted dates.
    const labels = sortedResults.map((r) =>
      new Date(r.date).toLocaleDateString()
    );
    // Data: score percentage per attempt.
    const scoreData = sortedResults.map(
      (r) => ((r.score / r.totalQuestions) * 100).toFixed(2)
    );

    const lineChartData = {
      labels,
      datasets: [
        {
          label: `Level ${level} Score Progression (%)`,
          data: scoreData,
          borderColor: "#4299E1",
          backgroundColor: "#4299E1",
          fill: false,
          tension: 0.1,
        },
      ],
    };

    const lineChartOptions = {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: {
          display: true,
          text: `Score Progression for Level ${level}`,
        },
      },
    };

    return (
      <div key={level} className="mb-12">
        {/* Fixed size container for realistic graph dimensions with border & shadow */}
        <div className="w-[400px] h-[300px] mx-auto border border-gray-300 rounded-lg shadow-2xl p-4">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      </div>
    );
  };

  // Function to calculate improvement based on first and latest attempt.
  const getImprovementInfo = (results) => {
    if (results.length < 2) {
      return "Not enough data to determine improvement.";
    }
    const sortedResults = results
      .slice()
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    const firstPercentage =
      (sortedResults[0].score / sortedResults[0].totalQuestions) * 100;
    const lastPercentage =
      (sortedResults[sortedResults.length - 1].score /
        sortedResults[sortedResults.length - 1].totalQuestions) *
      100;
    const improvementValue = lastPercentage - firstPercentage;
    if (improvementValue >= 0) {
      return `Your performance improved by ${improvementValue.toFixed(
        2
      )}% from your first attempt.`;
    } else {
      return `Your performance declined by ${Math.abs(
        improvementValue
      ).toFixed(2)}% from your first attempt.`;
    }
  };

  // Determine which level to focus on based on the lowest average score (if any data exists)
  const levelToFocus = levelMetrics.reduce((acc, curr) => {
    if (curr.attempts > 0) {
      if (!acc || curr.avgScorePercentage < acc.avgScorePercentage) {
        return curr;
      }
    }
    return acc;
  }, null);

  return (
    <div className="min-h-screen p-6 bg-richblack-800 text-white">
      <h1 className="text-3xl font-bold text-center mb-8">
        User Performance Overview
      </h1>

      {/* Display Average Score by Level */}
      <div className="mb-12">
        <div className="w-[500px] h-[350px] mx-auto border border-gray-300 rounded-lg shadow-2xl p-4 mb-6">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
        <div className="mt-4 text-center">
          {levelToFocus ? (
            <p>
              Consider focusing on Level {levelToFocus.level} as your average
              score is {levelToFocus.avgScorePercentage.toFixed(2)}%.
            </p>
          ) : (
            <p>No sufficient data to suggest a focus level.</p>
          )}
        </div>
      </div>

      {/* Display Score Progression per Level */}
      <div>
        {levels.map((level) => {
          const metrics = levelMetrics.find((m) => m.level === level);
          return (
            <div key={level} className="mb-12">
              {/* Header with level and attempt info centered separately */}
              <div className="mb-4 text-center">
                <div className="text-2xl font-semibold mb-1">
                  Level {level}
                </div>
                <div className="text-lg font-medium">
                  {metrics.attempts} Attempt{metrics.attempts !== 1 ? "s" : ""}
                </div>
              </div>
              {renderProgressionChart(level)}
              <div className="text-center mt-2">
                <p>{getImprovementInfo(metrics.results)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PerformancePage;
