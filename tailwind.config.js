/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1a5f7a",
          light: "#2d8ba8",
          dark: "#0f4456"
        },
        accent: {
          DEFAULT: "#e67e22",
          light: "#f39c12",
          dark: "#d35400"
        },
        surface: "#ffffff",
        background: "#f8f9fa",
        success: "#27ae60",
        warning: "#f39c12",
        error: "#e74c3c",
        info: "#3498db"
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"]
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.1)",
        "card-hover": "0 8px 24px rgba(0, 0, 0, 0.15)",
        modal: "0 20px 60px rgba(0, 0, 0, 0.3)"
      },
      transitionDuration: {
        200: "200ms",
        300: "300ms",
        400: "400ms"
      }
    },
  },
  plugins: [],
}