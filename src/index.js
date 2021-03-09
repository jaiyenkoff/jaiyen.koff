import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import { Provider } from "react-redux";
import store from './redux/createStore';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';


ReactDOM.render(
  <React.StrictMode>
     <ThemeProvider theme={theme}>
     <CssBaseline />
    <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


