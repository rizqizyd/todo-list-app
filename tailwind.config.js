/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customPurple: "#6C63FF",
        customPurple20: "rgba(108, 99, 255, 0.2)",
        customBlack: "#252525",
        customBlack50: "rgba(37, 37, 37, 0.8)",
      },
    },
  },
  plugins: [],
};
