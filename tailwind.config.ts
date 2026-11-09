import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paiza: {
          blue: "#00A3DA",
          "blue-dark": "#0085B3",
          "blue-soft": "#E6F6FC",
          orange: "#FF8800",
          "orange-dark": "#E67A00",
          pink: "#E05397",
          gold: "#FFB700",
          bg: "#F4F7F9",
          ink: "#333333",
          sub: "#777777",
          line: "#E2E8F0",
          ok: "#1FA463",
          ng: "#E5484D",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-noto)",
          "'Noto Sans JP'",
          "'Yu Gothic UI'",
          "Meiryo",
          "'Helvetica Neue'",
          "Arial",
          "sans-serif",
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      borderRadius: {
        card: "8px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(15, 40, 60, 0.08), 0 1px 2px rgba(15, 40, 60, 0.04)",
        pop: "0 8px 24px rgba(0, 163, 218, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
