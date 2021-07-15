import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { createTheme, ThemeProvider } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2565A0'
    },
    secondary: {
      main: '#FFFFFF'
    }
  },
  shape: {
    borderRadius: 25,

  },
  typography: {
    fontSize: 24,
    fontWeight: 'fontWeightLight'

  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
  <App />
  </ThemeProvider>,
  document.getElementById('app')
);