import React, { Component } from 'react';

import Main from './containers/Main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class App extends Component {
  render() {
    return (
      <MuiThemeProvider> 
        <Main />
      </MuiThemeProvider>
    );
  }
}

export default App;
