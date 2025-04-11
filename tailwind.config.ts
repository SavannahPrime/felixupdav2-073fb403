
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
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
        // Fashion model portfolio specific colors
        'fashion-midnight': '#0D1117',
        'fashion-champagne': '#F6F1E9',
        'fashion-gold': '#D4AF37',
        'fashion-silver': '#C0C0C0',
        'fashion-purple': '#4A0E54',
        'fashion-nebula': '#2A1B3D',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cosmic-nebula': 'url(/nebula-texture.png)',
        'model-felix': 'url(/lovable-uploads/97f9824b-6c53-49d0-8b3d-6288a3588b6e.png)',
        'model-catwalk': 'url(/lovable-uploads/98b0559a-74a6-4060-b518-09ea4f08b728.png)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "reveal": {
          from: { width: "0" },
          to: { width: "100%" },
        },
        "spotlight": {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
          "25%": { opacity: "0.6", transform: "translate(-50%, -40%) scale(1)" },
          "50%": { opacity: "0.3", transform: "translate(-30%, -20%) scale(0.8)" },
          "75%": { opacity: "0.5", transform: "translate(-60%, -50%) scale(1.2)" },
          "100%": { opacity: "0", transform: "translate(-50%, -40%) scale(0.5)" },
        },
        "runway-walk": {
          "0%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(0)" },
          "55%": { transform: "translateX(0) rotateY(0)" },
          "60%": { transform: "translateX(0) rotateY(180deg)" },
          "100%": { transform: "translateX(100%) rotateY(180deg)" },
        },
        "fabric-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "measuring-tape": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 1s ease-out forwards",
        "reveal": "reveal 1.5s ease-out forwards",
        "spotlight": "spotlight 8s ease-in-out infinite",
        "runway-walk": "runway-walk 3s ease-in-out",
        "fabric-flow": "fabric-flow 8s ease infinite",
        "measuring-tape": "measuring-tape 2s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
