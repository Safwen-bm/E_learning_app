const { withUt } = require("uploadthing/tw");

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"], // Enable dark mode
  content: [
    './pages/**/*.{ts,tsx}',   // Ensure all files in pages are covered
    './components/**/*.{ts,tsx}', // Ensure all files in components are covered
    './app/**/*.{ts,tsx}',      // Ensure all files in app are covered
    './src/**/*.{ts,tsx}',      // If you're using the src directory
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Landing page identity only ("chalkboard" theme).
        // Kept separate from the shadcn tokens above so the dashboard is untouched.
        marketing: {
          bg: "#152C27",        // deep blackboard green
          bgDeep: "#0E211D",    // darker panel / footer
          chalk: "#ECEFE9",     // chalk-white text
          chalkDim: "#B9C4BC",  // muted chalk (secondary text)
          yellow: "#E8B84A",    // chalk-pastel accent
          coral: "#D2685A",     // secondary accent
          line: "rgba(236,239,233,0.12)", // hairline / board smudge
          ink: "#16241F",         // dark text on light sections
          panel: "#1E3B34",       // raised card on dark sections
          mustardDeep: "#B9812E", // accent on light sections
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

// Export the Tailwind config wrapped with uploadthing
module.exports = withUt(config);
