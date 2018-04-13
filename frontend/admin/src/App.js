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
          incidents : []
      }
  }

  componentWillMount() {
    console.log("Fetching..");
    this.fetch_incidents();
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
      console.log(json);
      this.setState({
        incidents : json
      })
    }.bind(this))
    .catch((error) => {
      console.log(error);
    });
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
                <MapComponent incident_list={this.state.incidents}/>
            </Col>
            </Row>
          </Grid>
      </div>
    </MuiThemeProvider>
  )
}
}

export default App;
/*
            {_id : "1",
            name : "Incident One",
            notes : "Fight fight",
            lat: 59.329240,
            lng: 18.066542,
            timestamp : "18:47",
            status: "pending"},
            {_id : "2",
            name : "Incident Two",
            notes : "Borgare",
            lat: 59.329640,
            lng: 18.062616,
            timestamp : "20:34",
            status: "resolved"},
            {_id : "3",
            name : "Incident Three",
            notes : "Kugga ALLT",
            lat: 59.329940,
            lng: 18.070040,
            timestamp : "21:19",
            status: "active"}
  */
