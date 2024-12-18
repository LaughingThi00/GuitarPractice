/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom:
          "inset 0px 5px 15px rgba(0, 0, 0, 0.4), inset 0 0 5px rgba(255, 255, 255, 0.4)",
      },
      screens: {
        mini: { max: "700px" },
        med: { max: "900px" },
        aver: { max: "1100px" },
        landscape: { raw: "(orientation: landscape)" },
      },
      height: {
        "1/3vh": "33.33vh",
        "90pc": "90%",
      },
      width: { "90pc": "90%" },
      inset: {        "5pc": "5%",

        "15pc": "15%",
        "22pc": "22%",
        "20pc": "20%",
        "90pc": "90%",
      },
    },
  },
  plugins: [],
};
