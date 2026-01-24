/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        neon: {
            red: "#ff003c",
            green: "#00ff00",
            blue: "#00f0ff",
            purple: "#bc13fe",
            yellow: "#fcee0a"
        }
      },
    },
  },
  plugins: [],
}
