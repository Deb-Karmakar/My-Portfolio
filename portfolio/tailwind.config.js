/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        'primary-dark': '#4338ca',
        secondary: '#8b5cf6',
        accent: '#06b6d4',
        text: '#f1f5f9',
        'text-muted': '#94a3b8',
        bg: '#0f172a',
        'bg-card': 'rgba(30, 41, 59, 0.8)',
      },
      fontFamily: {
        inter: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: { /* ... */ },
        float: { /* ... */ },
        
        // ADVANCED PARTICLE ANIMATIONS
        floatUpParticle: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '1' },
          '100%': { transform: 'translate(var(--drift-x), calc(-100vh + var(--drift-y))) scale(0.5)', opacity: '0' },
        },
        floatUpSpiral: {
          '0%': { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: '1' },
          '100%': { transform: 'translate(var(--drift-x), calc(-100vh + var(--drift-y))) rotate(720deg) scale(0.5)', opacity: '0' },
        },
        floatUpZigzag: {
          '0%, 100%': { transform: 'translate(0, 0)', opacity: '0' },
          '10%, 90%': { opacity: '1' },
          '25%': { transform: 'translate(calc(var(--drift-x) * 0.25), calc(-25vh + var(--drift-y) * 0.25)) translateX(20px)' },
          '50%': { transform: 'translate(calc(var(--drift-x) * 0.5), calc(-50vh + var(--drift-y) * 0.5)) translateX(-20px)' },
          '75%': { transform: 'translate(calc(var(--drift-x) * 0.75), calc(-75vh + var(--drift-y) * 0.75)) translateX(20px)' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)', filter: 'brightness(1)' },
          '50%': { transform: 'scale(1.5)', filter: 'brightness(1.5)' },
        },
        twinkle: {
          '0%, 100%': { transform: 'scale(1)', filter: 'blur(0px) brightness(1)' },
          '50%': { transform: 'scale(2)', filter: 'blur(2px) brightness(2)' },
        },
        shootingStar: {
          '0%': { transform: 'translateX(0)', width: '0px', opacity: '1' },
          '70%': { width: '150px', opacity: '0.5' },
          '100%': { transform: 'translateX(100vw)', width: '150px', opacity: '0' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 1s ease-out forwards',
        float: 'float 20s ease-in-out infinite',
        pulse: 'pulse calc(var(--duration) / 2) infinite ease-in-out',
        twinkle: 'twinkle calc(var(--duration) / 2) infinite ease-in-out',
        shootingStar: 'shootingStar 3s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}