/** Rənglər və şriftlər 01_Design/style_guide.md ilə eynidir */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: { 50: "#EAF4FB", 100: "#D3E8F6", 500: "#1B87D0", 600: "#0B6FB8", 700: "#0A5A96", 900: "#0A3D62" },
        accent: { 50: "#E6F6F1", 500: "#1E9E78", 600: "#178566" },
        bg: "#F4F8FB", line: "#D5DEE6", ink: "#1C2733", muted: "#5B6B7A",
        warning: "#E0A100", danger: "#C0392B",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Arial", "sans-serif"],
        display: ["Poppins", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: { card: "0 1px 3px rgba(10,61,98,.08)", modal: "0 20px 40px rgba(10,61,98,.20)" },
    },
  },
  plugins: [],
};
