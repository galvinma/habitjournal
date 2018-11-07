import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './Store/store'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Nunito',
      'Nunito Sans',
      'Montserrat',
    ].join(','),
  },
  overrides:{
    MuiInput: {
      underline: {
        '&:after': {
          borderBottom: '#FFFFFF',
          }
      },
    },
    MuiInputLabel: {
      color: '#212121',
    },
    MuiTableCell: {
      root: {
        "&:last-child": {
          paddingRight: '0',
        }
      }
    },
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </MuiThemeProvider>,
document.getElementById('root'));
