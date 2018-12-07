import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './Store/store'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';

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
  }  
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <HashRouter>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <App />
        </MuiPickersUtilsProvider>
      </HashRouter>
    </Provider>
  </MuiThemeProvider>,
document.getElementById('root'));
