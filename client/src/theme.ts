import { createTheme, Theme } from '@mui/material/styles';

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

export default theme;