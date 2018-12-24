import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from './Store/store'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import history from './history';

require('dotenv').config()

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Nunito',
      'Nunito Sans',
      'Montserrat',
    ].join(','),
  },
  palette: {
    primary: { main: grey[900] },
    secondary: { main: grey[900] },
  },
  overrides: {
    MuiInput: {
      underline: {
        '&:after': {
          borderBottom: '#FFFFFF',
          }
      },
    },
    MuiTableCell: {
      root: {
        "&:last-child": {
          paddingRight: '0',
        }
      }
    },
    MuiTab: {
      root: {
        minWidth: '0px',
      },
    },
    MuiDialog: {
      paperScrollPaper: {
        maxHeight: '1200px',
      }
    }
  }
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router history={history}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <App />
        </MuiPickersUtilsProvider>
      </Router>
    </Provider>
  </MuiThemeProvider>,
document.getElementById('root'));
