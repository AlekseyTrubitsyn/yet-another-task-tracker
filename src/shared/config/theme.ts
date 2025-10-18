import { createTheme } from '@mantine/core';
import { components } from './mantine-components';

export const theme = createTheme({
  fontFamily: 'Plus Jakarta Sans, sans-serif',

  headings: {
    fontFamily: 'Plus Jakarta Sans, sans-serif',
    sizes: {
      h1: { fontSize: '24px', lineHeight: '30px', fontWeight: '700' }, // XL
      h2: { fontSize: '18px', lineHeight: '23px', fontWeight: '700' }, // L
      h3: { fontSize: '15px', lineHeight: '19px', fontWeight: '700' }, // M
      h4: { fontSize: '12px', lineHeight: '15px', fontWeight: '700' }, // S
    },
  },

  fontSizes: {
    xs: '12px',
    sm: '13px',
    md: '15px',
    lg: '18px',
    xl: '24px',
  },

  lineHeights: {
    xs: '15px',
    sm: '23px',
    md: '19px',
    lg: '23px',
    xl: '30px',
  },

  radius: {
    xl: '24px',
    lg: '20px',
    md: '8px',
    sm: '4px',
    xs: '2px',
  },

  colors: {
    primary: [
      '#E4EBFA', // 0
      '#F4F7FD', // 1
      '#A8A4FF', // 2
      '#635FC7', // 3
      '#828FA3', // 4
      '#3E3F4E', // 5
      '#20212C', // 6
      '#2B2C37', // 7
      '#000112', // 8
      '#FFFFFF', // 9
    ],
    red: [
      '#FFF5F5', // 0 - very light tint
      '#FFE0E0', // 1
      '#FFCCCC', // 2 - soft tint
      '#FFB3B3', // 3
      '#FF8989', // 4 - design soft red
      '#FF6B6B', // 5
      '#EA5555', // 6 - design main red
      '#CC4444', // 7
      '#B23333', // 8
      '#991F1F', // 9 - darkest
    ],
  },

  primaryColor: 'primary',

  defaultRadius: 'md',

  components,
});
