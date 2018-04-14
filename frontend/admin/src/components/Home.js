import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import ListView from './Listview';
import MapComponent from './MapComponent';

class Home extends Component {
  constructor(props) {
      super(props);

      this.state = {
        incidents : [],
        suggestions : [],
        lat: 59.329323,
        lon : 18.068581
      }
  }

  coordinate_callback = (coordinates) => {
    //lat lon
    console.log(coordinates[0]);
    console.log(coordinates[1]);
    this.setState({
      lat: coordinates[0],
      lon: coordinates[1]
    });
  }

  fetchIncidents() {
    fetch('http://localhost:3000/disturbances', {
      method: 'GET'
    })
      .then(function (res) {
        return res.json()
      })
      .then(function (json) {
        this.setState({
          incidents : json
        })
        this.fetch_suggestions();
      }.bind(this))
      .catch((error) => {
        console.log(error);
      });
  }

  fetch_suggestions() {
    fetch('http://localhost:3000/groups/suggestions', {
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
  componentDidMount() {
    this.fetchIncidents(); 
  }

  render() {
    return (
      <Grid fluid style={{ maxHeight: '700px' }}>
        <Row>
          <Col xs={3} style={{ maxHeight: '700px', overflow: 'scroll' }}>
            <ListView
              callback={this.coordinate_callback}
              incident_list={this.state.incidents} />
          </Col>
          <Col xs={9}>
            <MapComponent 
                lon_prop={this.state.lon}
                lat_prop={this.state.lat}
                incident_list={this.state.incidents}
                suggestion_list={this.state.suggestions}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Home;
