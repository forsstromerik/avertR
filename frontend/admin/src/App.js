import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from 'material-ui/AppBar';
import Home from './components/Home';
import Insights from './components/Insights';
import Drawer from 'material-ui/Drawer'; import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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

  fetch_groups () {
    fetch('http://localhost:3000/groups/suggestions', {
      method: 'GET',
      headers: {'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
      })
      .then(function (res) {
          return res.json()
      })
      .then(function (json) {
          this.setState({
            suggestions : json
          })
          this.map_incident_to_suggestion(); 
        }.bind(this))
        .catch((error) => {
          console.log(error);
        });
  }
  
  map_incident_to_suggestion() {
    //Iterate over incidents, see if they belong to any group
    var incidents = this.state.incidents;
    for (var i = 0; i < incidents.length; i++) {
      var current_id = incidents[i]._id;
      var belonging_suggestions = [];
      //For every incident, look which groups it's in
      var suggestions = this.state.suggestions;
      for (var j = 0; j < suggestions.length; j++) {
        var incident_ids = suggestions[i];
        if (suggestions[j].indexOf(current_id) !== 0) {
          belonging_suggestions.push(j);
          incidents[i].belonging_suggestions= belonging_suggestions;
        }
      }
    }
    this.setState({
      incidents : incidents
    })
  }

  render() {
    const style = {
      textDecoration: 'none',
      color: 'black'
    };

    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <div>
            <AppBar
              title="DisturbanceReporter"
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
