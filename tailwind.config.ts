// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         display: ["'Playfair Display'", "Georgia", "serif"],
//         body: ["'DM Sans'", "sans-serif"],
//         mono: ["'JetBrains Mono'", "monospace"],
//       },
//       colors: {
//         ink: {
//           50: "#f5f3ef",
//           100: "#e8e3d9",
//           200: "#cfc5b0",
//           300: "#b5a486",
//           400: "#9c855e",
//           500: "#7d6645",
//           600: "#634f36",
//           700: "#4a3a28",
//           800: "#31261b",
//           900: "#1a140e",
//           950: "#0d0a07",
//         },
//         gold: {
//           300: "#f5d98b",
//           400: "#e8c05a",
//           500: "#c9972a",
//           600: "#a67820",
//           700: "#7d5a16",
//         },
//         sage: {
//           300: "#a8c4a2",
//           400: "#7ea876",
//           500: "#5a8c52",
//           600: "#3d6636",
//         },
//         crimson: {
//           400: "#e05c5c",
//           500: "#c73838",
//           600: "#a02828",
//         },
//         azure: {
//           400: "#5c9fe0",
//           500: "#3878c7",
//           600: "#2560a8",
//         },
//         parchment: "#f7f3ec",
//         vellum: "#ede8df",
//       },
//       backgroundImage: {
//         "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
//       },
//       animation: {
//         "fade-in": "fadeIn 0.4s ease-out forwards",
//         "slide-up": "slideUp 0.4s ease-out forwards",
//         "pulse-soft": "pulseSoft 2s ease-in-out infinite",
//         "typing": "typing 1.2s ease-in-out infinite",
//       },
//       keyframes: {
//         fadeIn: {
//           from: { opacity: "0" },
//           to: { opacity: "1" },
//         },
//         slideUp: {
//           from: { opacity: "0", transform: "translateY(12px)" },
//           to: { opacity: "1", transform: "translateY(0)" },
//         },
//         pulseSoft: {
//           "0%, 100%": { opacity: "0.6" },
//           "50%": { opacity: "1" },
//         },
//         typing: {
//           "0%, 100%": { opacity: "0.2" },
//           "50%": { opacity: "1" },
//         },
//       },
//     },
//   },
//   plugins: [],
// };
// tailwind.config.ts
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Inter'", "'DM Sans'", "sans-serif"],
        body: ["'Inter'", "'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        primary: {
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
          DEFAULT: "var(--primary-500)",
        },
        secondary: {
          50: "var(--secondary-50)",
          100: "var(--secondary-100)",
          200: "var(--secondary-200)",
          300: "var(--secondary-300)",
          400: "var(--secondary-400)",
          500: "var(--secondary-500)",
          600: "var(--secondary-600)",
          DEFAULT: "var(--secondary-500)",
        },
        accent: {
          50: "var(--accent-50)",
          100: "var(--accent-100)",
          200: "var(--accent-200)",
          300: "var(--accent-300)",
          400: "var(--accent-400)",
          500: "var(--accent-500)",
          600: "var(--accent-600)",
          DEFAULT: "var(--accent-500)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        "gradient-secondary": "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
        "gradient-accent": "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "slide-up": "slideUp 0.4s ease-out forwards",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "typing": "typing 1.2s ease-in-out infinite",
        "bounce-slow": "bounce 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        typing: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};