/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
        logoClr: "var(--logoClr)",
        baseClr: "var(--baseClr)",
        sidebarLinkClr: "var(--sidebarLink)",
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
        "ripple": {
          from: { opacity: 1, scale: 0 },
          to: { opacity: 0, scale: 1 },
        },
        "border-spin": {
          from: { rotate: "0deg", scale: 1.12 },
          to: { rotate: "360deg", scale: 1.12 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "ripple": "ripple 2s infinite",
        "border-spin": "border-spin 25s linear infinite",
      },
      fontFamily: {
        poppins: ["var(--Poppins)"],
      },
      backgroundImage: {
        'radialGradient': 'radial-gradient(circle at 10% 10%, hsla(var(--primary)/ 0.5) 0%, hsla(var(--primary)/ 0.175) 100%)',
        'radialGradientDark': 'radial-gradient(circle at 10% 10%, hsla(var(--primary)/ 0.3) 0%, hsla(var(--primary)/ 0.075) 100%)',
        'sidebarGradient': 'radial-gradient(circle at 10% 10%, hsla(var(--sidebarClr)) 0%, hsla(var(--sidebarClr)/ 0.35) 100%)',
        'sidebarGradientDark': 'radial-gradient(circle at 10% 10%, hsla(var(--sidebarClr)) 0%, hsla(var(--sidebarClr)/ 0.35) 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}