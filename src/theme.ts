import { createTheme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#505554',
    },
    secondary: {
      main: '#FF866B',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
