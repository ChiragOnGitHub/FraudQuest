/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        "edu-sa": ["Edu SA Beginner", "cursive"],
        mono: ["Roboto Mono", "monospace"],
      },
      colors: {
        white: "#fff",
        black: "#000",
        transparent: "#ffffff00",
        richblack: {
          5: "#F1F2FF",
          25: "#DBDDEA",
          50: "#C5C7D4",
          100: "#AFB2BF",
          200: "#999DAA",
          300: "#838894",
          400: "#6E727F",
          500: "#585D69",
          600: "#424854",
          700: "#2C333F",
          800: "#161D29",
          900: "#000814",
        },
        richblue: {
          5: "#ECF5FF",
          25: "#C6D6E1",
          50: "#A0B7C3",
          100: "#7A98A6",
          200: "#537988",
          300: "#2D5A6A",
          400: "#073B4C",
          500: "#063544",
          600: "#042E3B",
          700: "#032833",
          800: "#01212A",
          900: "#001B22",
        },
        blue: {
          5: "#EAF5FF",
          25: "#B4DAEC",
          50: "#7EC0D9",
          100: "#47A5C5",
          200: "#118AB2",
          300: "#0F7A9D",
          400: "#0C6A87",
          500: "#0A5A72",
          600: "#074B5D",
          700: "#053B48",
          800: "#022B32",
          900: "#001B1D",
        },
        pink: {
          5: "#FFF1F1",
          25: "#FBC7D1",
          50: "#F79CB0",
          100: "#F37290",
          200: "#EF476F",
          300: "#D43D63",
          400: "#BA3356",
          500: "#9F294A",
          600: "#841E3E",
          700: "#691432",
          800: "#4F0A25",
          900: "#340019",
        },
        red: {
            500: "#EF476F", // Replaces red-500
            700: "#D43D63", // Replaces red-700
          },
          orange:{
            500:"#f97316",
          },
        green: {
            5: "#E8F5E9",
            25: "#C8E6C9",
            50: "#A5D6A7",
            100: "#81C784",
            200: "#66BB6A",
            300: "#4CAF50", // Matches green-500
            400: "#43A047",
            500: "#388E3C",
            600: "#2E7D32",
            700: "#1B5E20", // Matches green-700
            800: "#104D1E",
            900: "#0A3D17",
        },
        yellow: {
          5: "#FFF970",
          25: "#FFE83D",
          50: "#FFD60A",
          100: "#E7C009",
          200: "#CFAB08",
          300: "#B69507",
          400: "#9E8006",
          500: "#866A04",
          600: "#6E5503",
          700: "#553F02",
          800: "#3D2A01",
          900: "#251400",
        },
      },
      extend: {
        maxWidth: {
          maxContent: "1260px",
          maxContentTab: "650px"
        },
      },
    },
    plugins: [],
  };
  