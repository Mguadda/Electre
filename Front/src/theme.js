import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4D869C',
      light: '#7AB2B2',
    },
    secondary: {
      main: '#EEF7FF',
    },
    background: {
      default: '#CDE8E5',
      paper: '#EEF7FF',
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          background-image: url('/background.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
        }
      `
    }
  }
});

export default theme;