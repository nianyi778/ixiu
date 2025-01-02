/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/renderer/**/*.{js,jsx,ts,tsx}', './src/index.html'],
  theme: {
    extend: {
      keyframes: {
        jump: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-50px)' }
        }
      },
      animation: {
        jump: 'jump 0.5s ease-in-out'
      }
    }
  },
  variants: {
    extend: {
      backdropFilter: ['responsive'] // 确保启用了背景滤镜变种
    }
  },
  plugins: []
}
