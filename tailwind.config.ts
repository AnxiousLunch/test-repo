/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: { backgroundPosition: "50% 50%, 50% 50%" },
          to: { backgroundPosition: "350% 50%, 350% 50%" },
        },
      },
    },
  },
  plugins: [
    function addVariablesForColors({ addBase, theme }) {
      const colors = theme("colors");
      let newVars = {};

      for (const [key, val] of Object.entries(colors)) {
        if (typeof val === "string") {
          newVars[`--${key}`] = val;
        }
      }

      addBase({ ":root": newVars });
    },
  ],
};
