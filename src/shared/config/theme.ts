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
    // Primary purple shades
    primary: [
      '#E4EBFA', // 0 - lightest purple tint
      '#A8A4FF', // 1 - light purple
      '#635FC7', // 2 - main primary purple
      '#635FC7', // 3 - main primary purple (duplicate for variations)
      '#635FC7', // 4 - main primary purple (duplicate for variations)
      '#635FC7', // 5 - main primary purple (duplicate for variations)
      '#635FC7', // 6 - main primary purple (duplicate for variations)
      '#635FC7', // 7 - main primary purple (duplicate for variations)
      '#635FC7', // 8 - main primary purple (duplicate for variations)
      '#635FC7', // 9 - main primary purple (duplicate for variations)
    ],

    // Neutral/Dark shades
    dark: [
      '#FFFFFF', // 0 - white
      '#F4F7FD', // 1 - very light gray/background
      '#E4EBFA', // 2 - light gray
      '#828FA3', // 3 - medium gray (text secondary)
      '#3E3F4E', // 4 - dark gray
      '#2B2C37', // 5 - darker background
      '#20212C', // 6 - darkest background
      '#000112', // 7 - almost black
      '#000112', // 8 - almost black
      '#000112', // 9 - almost black
    ],

    // Red/Error shades
    red: [
      '#FF9898', // 0 - light red tint
      '#FF9898', // 1 - light red tint
      '#FF9898', // 2 - light red tint
      '#FF9898', // 3 - light red tint
      '#FF9898', // 4 - soft red
      '#EA5555', // 5 - main red
      '#EA5555', // 6 - main red (design primary)
      '#EA5555', // 7 - main red
      '#EA5555', // 8 - main red
      '#EA5555', // 9 - main red
    ],
  },

  primaryColor: 'primary',

  // Override default colors
  white: '#FFFFFF',
  black: '#000112',

  other: {
    // Additional design system colors for reference
    mainPurple: '#635FC7',
    mainPurpleLight: '#A8A4FF',
    black: '#000112',
    veryDarkGrey: '#20212C',
    darkGrey: '#2B2C37',
    linesLight: '#E4EBFA',
    mediumGrey: '#828FA3',
    linesDark: '#3E3F4E',
    lightGreyBg: '#F4F7FD',
    white: '#FFFFFF',
    red: '#EA5555',
    redLight: '#FF9898',
  },

  defaultRadius: 'md',

  components,
});
