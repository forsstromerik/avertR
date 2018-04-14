import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid, Row, Col } from 'react-flexbox-grid';

//Internal components
import ListView from './components/Listview';
import MapComponent from './components/MapComponent';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
          incidents : [],
          suggestions : []
      }
  }

  componentWillMount() {
    this.fetch_incidents();
  }

  componentDidMount() {
   
  }

  fetch_incidents () {
    fetch('http://localhost:3000/disturbances', {
      method: 'GET',
      headers: {'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
  })
  .then(function (res) {
      return res.json()
  })
  .then(function (json) {
      this.setState({
        incidents : json
      })
      this.fetch_groups();
      this.map_incident_to_group();
    }.bind(this))
    .catch((error) => {
      console.log(error);
    });
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
  return (
    <MuiThemeProvider>
      <div>
        <AppBar
          title="Disturbance Listener"
        />
          <Grid fluid>
            <Row>
            <Col xs={4}>
                <ListView incident_list={this.state.incidents}/>
            </Col>
            <Col xs={8}>
                <MapComponent 
                  incident_list={this.state.incidents}
                  suggestion_list={this.state.suggestions} 
                />
            </Col>
            </Row>
          </Grid>
      </div>
    </MuiThemeProvider>
  )
}
}

export default App;

