import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import ListView from './Listview';
import MapComponent from './MapComponent';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

class Home extends Component {
  constructor(props) {
      super(props);
      this.state = {
        incidents : [],
        suggestions : [],
        groups : [],
        police_events : [],
        lat: 59.329323,
        lon : 18.068581,
        show_incidents : "block",
        show_groups : "block",
        show_police : "block"
      }
  }
  
  toggle_incidents = () => {
    if (this.state.show_incidents === "block")
        this.setState({
          show_incidents : "none"
        });
    else {
        this.setState({
          show_incidents : "block"
        });
    }
  }

  convert_to_bool = (string) => {
    if (string === 'block') {
      return true 
    } else {
      return false 
    }
    console.log(string);
  }

  toggle_groups = () => {
    if (this.state.show_groups === "block")
        this.setState({
          show_groups: "none"
        });
    else {
        this.setState({
          show_groups: "block"
        });
    }
  }

  toggle_police = () => {
    if (this.state.show_police === "block")
        this.setState({
          show_police : "none"
        });
    else {
        this.setState({
          show_police : "block"
        });
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

  fetch_incidents() {
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
          this.setState({
            suggestions : json
          })
          this.map_incident_to_suggestion(); 
        }.bind(this))
        .catch((error) => {
          console.log(error);
      });
  }

  //Fetch police information
  fetch_police() {
    console.log("Fetching police!");
      var url = new URL("http://localhost:3000/police/events"),
          params = {lat: 59.3454488, lon: 18.0603384 , radius : 10 }
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    fetch(url, {
      method: 'GET'
      })
      .then(function (res) {
          return res.json()
      })
      .then(function (json) {
          console.log(json);
          this.setState({
            police_events : json
          })
        }.bind(this))
        .catch((error) => {
          console.log(error);
      });
  }

  //Fetch all grouped events
  fetch_groups() {
    console.log("Fetching groups!");
    var url = "http://localhost:3000/groups"
    fetch(url, {
      method: 'GET'
      })
      .then(function (res) {
          return res.json()
      })
      .then(function (json) {
          this.setState({
              groups : json
          })
          console.log(this.state.groups)
        }.bind(this))
        .catch((error) => {
          console.log(error);
      });
  }

  //Iterate over incidents, see if they belong to any suggestion
  map_incident_to_suggestion() {
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
    this.fetch_incidents(); 
    this.fetch_police();
    this.fetch_groups();
  }

  render() {
    return (
      <Grid fluid style={{ maxHeight: '700px' }}>
        <Row>
          <Col xs={3} style={{ maxHeight: '700px', overflow: 'scroll' }}>
          <Row style={{marginTop: "5px"}}>
            <Col md={4}>
                <RaisedButton 
                  label="Incidents" 
                  secondary={this.convert_to_bool(this.state.show_incidents)}
                  onClick={this.toggle_incidents}
                />
            </Col>
            <Col md={4}>
                <RaisedButton 
                  label="Groups" 
                  secondary={this.convert_to_bool(this.state.show_groups)}
                  onClick={this.toggle_groups}
            />
            </Col>
            <Col>
                <RaisedButton 
                  label="Police" 
                  secondary={this.convert_to_bool(this.state.show_police)}
                  onClick={this.toggle_police}
                />
            </Col>
          </Row>
            <ListView
              display_incidents={this.state.show_incidents}
              display_groups={this.state.show_groups}
              display_police={this.state.show_police}
              callback={this.coordinate_callback}
              police_incidents={this.state.police_events}
              group_incidents={this.state.groups}
              incident_list={this.state.incidents} />
          </Col>
          <Col xs={9}>
            <MapComponent 
                show_incidents={this.state.show_incidents}
                show_groups={this.state.show_groups}
                show_police={this.state.show_police}
                lon_prop={this.state.lon}
                lat_prop={this.state.lat}
                incident_list={this.state.incidents}
                police_incidents={this.state.police_events}
                group_incidents={this.state.groups}
                suggestion_list={this.state.suggestions}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Home;
