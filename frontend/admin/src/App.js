import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from 'material-ui/AppBar';
import Home from './components/Home';
import Insights from './components/Insights';
import Drawer from 'material-ui/Drawer'; import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { BrowserRouter, Route, Link } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incidents : [],
      open: false
    }
  }

  toggleDrawer = () => {
    this.setState({ open: !this.state.open }); 
  }

  render() {
    const style = {
      textDecoration: 'none',
      color: 'black'
    };

    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: '#0F2F44',
        accent1Color: '#508AA8'
      }
    });

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <BrowserRouter>
          <div>
            <AppBar
              title="avertR"
              onLeftIconButtonClick={this.toggleDrawer}
            />
            <Drawer
              docked={false}
              width={300}
              open={this.state.open}
              onRequestChange={(open) => this.setState({open})}>
              <Link style={style} to="/" onClick={this.toggleDrawer}>
                <MenuItem>Home</MenuItem>
              </Link>
              <Link style={style} to="/insights" onClick={this.toggleDrawer}>
                <MenuItem>Insights</MenuItem>
              </Link>
            </Drawer>

            <Route exact path="/" component={Home}/>
            <Route path="/insights" component={Insights}/>

          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export default App;
