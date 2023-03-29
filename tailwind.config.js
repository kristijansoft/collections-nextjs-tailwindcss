module.exports = {
  mode: 'jit',
  darkMode: false,
  plugins: [],
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  // or 'media' or 'class'
  theme: {
    extend: {
      outline: {
        red: '1px solid red',
      },
      padding: {
        50: '50%',
      },
      colors: {
        primary: {
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-200)',
        },
        textColor: {
          primary: 'var(--text-color-primary)',
          secondary: 'var(--text-color-secondary)',
        },
        secondary: 'var(--color-secondary)',
        tan: '#FDFAF4',
        ecruWhite: '#F8F3E6',
        gray: {
          600: '#666666',
        },
        brown: '#B1734E',
        sienna: '#B1734E',
        red: '#E31616',
        ocean: '#1681E3',
        yellow: '#FFA800',
        cyan: '#16E3CB',
        bragBarBckg: '#fef3ee',
        blue: '#2353A7',
      },
      fontSize: {
        xxs: ['.6875rem', '1rem'], // 11px, 16px
        xs: ['.75rem', '1.125rem'], // 12px, 18px,
        sm: ['.875rem', '1.3125rem'], // 14px, 21px,
        1.5: ['1.5rem'], // 24px
        2.25: ['2.25rem'], // 36px
        md: ['1.125rem', '1.6875rem'], // 18px, 27px
        xl: ['1.875rem', '2.8125rem'], // 30px, 45px
        xxl: ['3rem'], // 48px
      },
      spacing: {
        sidebar: '20.875rem', // 334px
        4.5: '1.125rem', // 18px
        17.5: '4.375rem', // 70px
      },
      fontFamily: {
        main: ['var(--font-main)', 'sans-serif'],
      },
      lineHeight: {
        15: '14px',
        3.5: '3.5rem', // 56px
      },
      minHeight: {
        11: '2.75rem', // 44px
      },
      maxHeight: {
        51.5: '51.5rem', // 824px
      },
      width: {
        28.12: '28.12rem', // 450px
        9.37: '9.37rem', // 150px
        70.6: '70.6%',
        90: '90%',
      },
      height: {
        46.25: '46.25rem',
        45: '45rem', // 720px
        25.87: '25.87rem', // 414px
        12: '12rem', // 192px
        10: '10rem', // 160px
        6.25: '6.25rem', // 100px
      },
    },
  },
  variants: {
    extend: {},
  },
};
