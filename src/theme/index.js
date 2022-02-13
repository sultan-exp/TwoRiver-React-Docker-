 

import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      // default: '#F4F6F8',
      default: '#FFFFFF',
      paper: colors.common.white,
      color: '#5664d2'
    },
    primary: {
      contrastText: '#5664d2',
      // main: '#5664d2'
      color: '#5664d2',
      main: '#FFFFFF'
    },
    text: {
      primary: '#172b4d',
      secondary: '#6b778c'
    }
  },
  shadows,
  typography
});

export default theme;
