/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        // Right-inclined 3D: white face, black outline (border), solid black shadow on bottom + right only
        'key': '0 4px 0 0 #000, 4px 0 0 0 #000, 0 5px 10px rgba(0,0,0,0.2)',
        'key-sm': '0 3px 0 0 #000, 3px 0 0 0 #000, 0 4px 8px rgba(0,0,0,0.15)',
        'key-md': '0 5px 0 0 #000, 5px 0 0 0 #000, 0 6px 12px rgba(0,0,0,0.2)',
        'key-lg': '0 6px 0 0 #000, 6px 0 0 0 #000, 0 8px 16px rgba(0,0,0,0.2)',
      },
      colors: {
        // Main: whitish. Secondary: green + black. Raised shadows on buttons/icons.
        'ref-dark': '#1A0C1F',
        'ref-dark-soft': '#2d1f33',
        'ref-yellow': '#EAB308',
        'ref-yellow-soft': '#FDE047',
        'ref-green': '#22C55E',
        'ref-green-bright': '#00D26A',
        'ref-green-dark': '#16A34A',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: '#22C55E',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#EAB308',
          foreground: '#000000',
        },
        accent: {
          DEFAULT: '#7C3AED',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
