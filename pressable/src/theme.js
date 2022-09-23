/** @format */
import {DefaultTheme} from 'react-native-paper';

const dark = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: 'rgba(255, 255, 255, 0.9)',
    primary: 'tomato',
    accent: 'yellow',
    lineColor: '#383A46',
    background: '#222229',
  },
};

const light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    lineColor: '#f9f9f9',
    background: '#fff',
    accent: 'yellow',
  },
};

export default {dark, light};
