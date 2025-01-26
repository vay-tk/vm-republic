/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'confetti': 'confetti 1s ease-out forwards',
        'fly': 'fly 15s linear infinite',
      },
      keyframes: {
        confetti: {
          '0%': { transform: 'translateY(-10px) rotateZ(0deg)', opacity: 1 },
          '100%': { transform: 'translateY(100px) rotateZ(360deg)', opacity: 0 },
        },
        fly: {
          '0%': { transform: 'translateX(100vw) translateY(0px)' },
          '100%': { transform: 'translateX(-100vw) translateY(-20px)' },
        },
      }
    },
  },
  plugins: [],
};
