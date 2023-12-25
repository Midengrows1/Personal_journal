/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/components/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Smooch: ["Smooch", "cursive"],
        FiraSans: ["Fira Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
