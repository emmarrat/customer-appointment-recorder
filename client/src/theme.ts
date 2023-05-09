import { createTheme, Theme } from '@mui/material/styles';
import { ruRU } from '@mui/x-date-pickers/locales';

const theme: Theme = createTheme({
  palette: {

    primary: {
      main: '#a4688e',
      light: '#d77bb3',
      dark: '#855374'
    },
    secondary: {
      main: '#b5838d',
      dark: '#6d6875',
    },
    info: {
      main: '#fff',
      dark: '#afaeae'
    },
    text: {
      primary: '#3b3939',
    },
  },
  typography: {
    fontFamily: 'Open Sans, sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },
  },
});

export const themeDate = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  ruRU, // use 'de' locale for UI texts (start, next month, ...)
);

export default theme;