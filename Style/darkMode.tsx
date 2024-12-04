import {DefaultTheme, MD3DarkTheme} from 'react-native-paper';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    background: '#f5f5f5',
    surface: '#ffffff',
    text: '#000000',
    accent: '#03dac4',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#bb86fc',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
    accent: '#03dac6',
  },
};
