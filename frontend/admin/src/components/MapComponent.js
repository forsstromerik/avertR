import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

import DisturbanceMapComponent from './DisturbanceMapComponent';
import Group from './Group.js';
import Suggestion from './Suggestion.js';

export default class MapComponent extends Component {
  constructor(props) {
    super(props)

    this.state = ({
      show_suggestions: false,
      show_suggestion_color : false
    });
  } 

  static defaultProps = { center: {
    lat: 59.329323,
    lng: 18.068581
  },
    zoom: 13
  };

  display_suggestions = () =>{
    this.setState({
      show_suggestions : !this.state.show_suggestions
    }) 
  }

  color_suggestions = () => {
    this.setState({
      show_suggestion_color: true 
    }) 
  }

  //Why.....
  uncolor_suggestions = () => {
    this.setState({
      show_suggestion_color: false 
    }) 
  }

  render() {
    const incidents = this.props.incident_list;
    let suggestions = this.props.suggestion_list;
    if (!suggestions) { suggestions = []; }
    const map_incidents = incidents.map((incident) => 
      <DisturbanceMapComponent 
        key={incident._id} 
        incident_name={incident.name} 
        incident_notes={incident.notes} 
        lat={incident.lat} 
        lng={incident.lon}
        incident_time={incident.timestamp}
        incident_status={incident.status}
        incident_belonging_suggestions={incident.belonging_suggestions} 
        incident_show_suggestion_color={this.state.show_suggestion_color}
      />
    );

    if (suggestions) {
      const map_suggestions = suggestions.map((suggestion) =>
        <div>
          <Suggestion
            suggested_group={suggestion}
          />
          <Divider />
        </div>
      );

      const dialog_actions = [
        <RaisedButton key={1} label="Close" primary={true} onClick={this.display_suggestions} />
      ]
      return (
        // Important! Always set the container height explicitly
        <div style={{ height: '700px', width: '100%' }}>
          <GoogleMapReact
            onGoogleApiLoaded={({ map, maps }) => { this.setState({ map: map, maps:maps, mapLoaded: true }) }}
            bootstrapURLKeys={{ "key": "AIzaSyAys6BYpEjD1_HFe8b9O7E-i5yVM6nyQsU" }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <RaisedButton label="List suggestions" onClick={this.display_suggestions} />
            <RaisedButton label="Color suggestions" onClick={this.color_suggestions} />
            <RaisedButton label="Uncolor suggestions" secondary={true} onClick={this.uncolor_suggestions} />
            {map_incidents}
            <Dialog
              open={this.state.show_suggestions}
              title="Suggested Groups"
              actions={dialog_actions}
            >
              {map_suggestions}
            </Dialog>
            {map_incidents}
          </GoogleMapReact>
        </div>
      );
    }
  }
}
