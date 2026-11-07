/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "var(--color-bg)",
          elevated: "var(--color-bg-elevated)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          hover: "var(--color-surface-hover)",
          muted: "var(--color-surface-muted)",
        },
        fg: {
          DEFAULT: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
          inverse: "var(--color-text-inverse)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
          secondary: "var(--color-accent-secondary)",
          soft: "var(--color-accent-soft)",
        },
        line: {
          DEFAULT: "var(--color-border)",
          strong: "var(--color-border-strong)",
          input: "var(--color-border-input)",
        },
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        danger: "var(--color-danger)",
        info: "var(--color-info)",
        portal: {
          bg: "var(--portal-bg)",
          subtle: "var(--portal-subtle)",
          ink: "var(--portal-ink)",
          muted: "var(--portal-muted)",
          faint: "var(--portal-faint)",
          line: "var(--portal-line)",
          brand: "var(--portal-brand)",
          "brand-hover": "var(--portal-brand-hover)",
          danger: "var(--portal-danger)",
          success: "var(--portal-success)",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        hero: ["clamp(2.25rem, 1.5rem + 2.4vw, 3.5rem)", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
        page: ["clamp(2.125rem, 1.7rem + 1.4vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        section: ["clamp(1.5rem, 1.25rem + 0.9vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
      },
      maxWidth: {
        content: "1280px",
        reading: "760px",
        report: "1040px",
      },
    },
  },
  plugins: [],
};
