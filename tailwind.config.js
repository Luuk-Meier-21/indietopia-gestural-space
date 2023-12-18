/** @type {import('tailwindcss').Config} */

function objectForLength(n, func = () => {}) {
  return {
    ...Array.from(Array(n)).reduce((a, _, i) => ({ ...a, ...func(i + 1) })),
  };
}

export default {
  content: ["./index.html", "./src/**/*.{html,css,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      ringWidth: {
        px: "1px",
      },
      borderWidth: {
        px: "1px",
      },
      colors: {
        "space-blue": {
          900: "#0A1E2D",
        },
      },
      transitionDuration: {
        ...objectForLength(20, (i) => ({
          [i * 100]: `${i * 100}ms`,
        })),
      },
    },
  },
  plugins: [],
};
