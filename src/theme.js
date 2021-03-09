import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e9cba7',
    },
    secondary: {
      main: '#e9cba7',
      tonalOffset: 0.2,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: 'Playfair Display',
    fontSize: '16px',
  },
});

export default theme;