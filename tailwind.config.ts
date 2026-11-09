import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paiza: {
          blue: "#0d6bd3",
          "blue-hover": "#0b58ad",
          "blue-light": "#f6faff",
          cyan: "#00A3DA",
          orange: "#ff8800",
          "orange-hover": "#e67a00",
          green: "#1fa463",
          bg: "#f5f7fa",
          border: "#ededed",
          line: "#d7e0e2",
          ink: "#333333",
          sub: "#6e7687",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'Helvetica Neue'",
          "'Segoe UI'",
          "'Hiragino Kaku Gothic ProN'",
          "'Hiragino Sans'",
          "'Yu Gothic'",
          "YuGothic",
          "Meiryo",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "'Liberation Mono'",
          "'Courier New'",
          "monospace",
        ],
      },
      borderRadius: {
        paiza: "4px",
      },
      boxShadow: {
        paiza: "0 0 4px rgba(0, 0, 0, 0.18)",
        "paiza-card": "0 1px 3px rgba(0, 0, 0, 0.12)",
        "paiza-button": "0 1px 4px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
