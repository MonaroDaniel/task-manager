/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wh': {
          '00': 'var(--white-00)',
          '01': 'var(--white-01)',
          '02': 'var(--white-02)',
        },
        'gr': {
          '00': 'var(--gray-00)',
          '01': 'var(--gray-01)'
        },
        'bl': {
          '00': 'var(--blue-00)',
          '01': 'var(--blue-01)',
          '02': 'var(--blue-02)',
        },
        'bk': {
          '00': 'var(--black-00)'
        }
      },
    },
  },
  plugins: [],
}

