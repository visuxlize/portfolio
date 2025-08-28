/**  @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1b3560',
          dark: '#12284a',
          light: '#2d4b7a'
        },
        accent: {
          DEFAULT: '#3498db',
          dark: '#2980b9',
          light: '#5dade2'
        },
        dark: '#1a202c',
        light: '#f7fafc'
      },
      fontFamily: {
        sans: ['proxima-nova', 'Arial', 'sans-serif'],
        heading: ['proxima-nova', 'Arial', 'sans-serif']
      },
      animation: {
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },
      backgroundImage: {
        'footer-gradient': 'linear-gradient(52deg, #1b3560 0%, #1b3560 52%, #12284a 52%, #12284a 100%)'
      }
    },
  },
  plugins: [],
};
 