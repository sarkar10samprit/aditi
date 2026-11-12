/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#FFF0F3',
          100: '#FFE3E8',
          200: '#FFCCD5',
          300: '#FFA3B5',
          400: '#FF7597',
          500: '#FF9EAA',
          600: '#E65D82',
        },
        lavender: {
          50: '#F7F3FF',
          100: '#EFE7FE',
          200: '#E0D0FD',
          300: '#E8D5FF',
          400: '#BA9BFB',
          500: '#9B72F7',
        },
        buttercream: '#FFF9F5',
        peach: '#FFD9C0',
        sparkle: '#FFD166',
        charcoal: '#2D3748',
      },
      fontFamily: {
        heading: ['Fredoka', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
        handwriting: ['Caveat', 'cursive'],
      },
      boxShadow: {
        'clay-card': '8px 8px 16px rgba(255, 158, 170, 0.18), -8px -8px 16px rgba(255, 255, 255, 0.9), inset 2px 2px 4px rgba(255, 255, 255, 0.6)',
        'clay-btn': '4px 4px 10px rgba(255, 158, 170, 0.35), -4px -4px 10px rgba(255, 255, 255, 0.9)',
        'clay-pressed': 'inset 3px 3px 6px rgba(230, 93, 130, 0.25), inset -3px -3px 6px rgba(255, 255, 255, 0.8)',
        'polaroid': '0 12px 28px -6px rgba(45, 55, 72, 0.12), 0 4px 10px -2px rgba(45, 55, 72, 0.06)',
        'glow-pink': '0 0 25px rgba(255, 158, 170, 0.45)',
        'glow-gold': '0 0 25px rgba(255, 209, 102, 0.5)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(14px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
}
