import { useNavigate } from "react-router-dom";

const QDashboard = () => {
  const navigate = useNavigate();

  const levels = [
    {
      level: "Beat the Scam Clock",
      description:
        "Time's ticking, but you must stay sharp! Outsmart scammers before the clock runs out—quick decisions are your only chance to win this fraud-busting showdown.",
      image: "/1.jpg",
    },
    {
      level: "Outlast the Trickery",
      description:
        "Endurance is key in this long-form fraud quiz! Keep your focus as you tackle challenge after challenge, outwitting scammers and surviving the marathon to victory. Can you go the distance and emerge a fraud-fighting champion?",
      image: "/2.jpg",
    },
    {
      level: "Lifeline Legends: The Quiz Show",
      description:
        "Prepare for a thrilling quiz where every question could be your last—unless you use your lifelines! Dive into a world of deceptive scenarios, while unlocking exciting features that can tilt the odds in your favor. Choose your paths wisely, but remember: the clock's ticking, and the scammers are relentless!",
      image: "/3.jpg",
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#121212" }}>
      <div className="flex flex-col items-center justify-center py-8 px-6">
        {/* Main Heading without gradient */}
        <h1
          className="text-5xl font-extrabold text-center mb-12"
          style={{
            color: "#FFD700", // Dark Orange
            fontFamily: "'Poppins', sans-serif",
            // textShadow: "2px 2px 8px rgba(255, 140, 0, 0.6)",
          }}
        >
          Triple Threat: Pick Your Game
        </h1>
        <div className="w-full max-w-5xl space-y-12">
          {levels.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/dashboard/quiz/${index}`)}
              className="flex flex-col md:flex-row items-center rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden"
              style={{
                backgroundColor: "#1F1F1F", // Game block background
                border: "2px solid #FF4500", // Bold border color
              }}
            >
              {index % 2 === 0 ? (
                <>
                  <img
                    src={item.image}
                    alt={item.level}
                    className="w-full md:w-48 h-48 object-cover"
                  />
                  <div className="p-6 text-left">
                    <h2
                      className="text-3xl font-bold p-2 transition-all duration-300 transform hover:-translate-y-1"
                      style={{ color: "#FFD700" }} // Golden title color
                    >
                      {item.level}
                    </h2>
                    <p
                      className="mt-2 p-2 transition-all duration-300 transform hover:-translate-y-1"
                      style={{ color: "#FFFFFF" }} // White description text
                    >
                      {item.description}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-6 text-right flex-1">
                    <h2
                      className="text-3xl font-bold p-2 transition-all duration-300 transform hover:-translate-y-1"
                      style={{ color: "#FFD700" }}
                    >
                      {item.level}
                    </h2>
                    <p
                      className="mt-2 p-2 transition-all duration-300 transform hover:-translate-y-1"
                      style={{ color: "#FFFFFF" }}
                    >
                      {item.description}
                    </p>
                  </div>
                  <img
                    src={item.image}
                    alt={item.level}
                    className="w-full md:w-48 h-48 object-cover"
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QDashboard;
