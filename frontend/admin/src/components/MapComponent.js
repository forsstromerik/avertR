import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import { Grid, Row, Col } from 'react-flexbox-grid';

import DisturbanceMapComponent from './DisturbanceMapComponent';
import Group from './Group.js';
import Suggestion from './Suggestion.js';

export default class MapComponent extends Component {
  constructor(props) {
    super(props)

    this.state = ({
      show_suggestions: false,
      show_suggestion_color : false,
      center : {
        lat: 59.329323,
        lng: 18.068581
      },
      current_lat : 59.329323,
      current_lon : 18.068581
    });
  } 
  static defaultProps = { 
    center: {
      lat: 59.329323,
      lng: 18.068581
    },
      zoom: 11
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

  change_pos = () => {
    var tryCenter = {
        lat: 59.378062,
        lng: 15.920754 
    }
    this.setState({
      center : tryCenter
    })
  }

  //Why.....
  uncolor_suggestions = () => {
    this.setState({
      show_suggestion_color: false 
    }) 
  }

  componentWillReceiveProps() {
    var new_center = {
      lat : this.props.lat_prop,
      lng : this.props.lon_prop
    }
    this.setState({
      center : new_center,
      current_lat : this.props.lat_prop,
      current_lon : this.props.lon_prop,
      current_active_id : this.props.current_active_id
    });
  }
  render() {
    const incidents = this.props.incident_list;
    let suggestions = this.props.suggestion_list;
    if (!suggestions) { suggestions = []; }
    //User reported incidents
    const map_incidents = incidents.map((incident) => 
      <DisturbanceMapComponent 
        display={this.props.show_incidents}
        group_id={this.props.groupId}
        groups_displayed={this.props.show_groups}
        current_active_id={this.state.current_active_id}
        key={incident._id}
        id={incident._id}
        incident_name={incident.name} 
        incident_notes={incident.notes} 
        lat={incident.lat} 
        lng={incident.lon}
        incident_time={incident.timestamp}
        incident_status={incident.status}
        $hover={false}
        incident_belonging_suggestions={incident.belonging_suggestions} 
        incident_show_suggestion_color={this.state.show_suggestion_color}
      />
    );
    //Police incidents
    var police_incidents = []
    if (this.props.police_incidents) {
        police_incidents = this.props.police_incidents.map((incident) => 
          <DisturbanceMapComponent 
            display={this.props.show_police}
            key={incident._id} 
            id={incident._id}
            incident_name={incident.name} 
            current_active_id={this.state.current_active_id}
            incident_notes={incident.notes} 
            lat={incident.lat} 
            lng={incident.lon}
            $hover={false}
            incident_time={incident.timestamp}
            police_event={true}
          />
        );
    }
    //Group incidents
    var group_incidents = [];
    if (this.props.group_incidents) {
        group_incidents = this.props.group_incidents.map((group) => 
          <DisturbanceMapComponent 
            display={this.props.show_groups}
            key={group.id} 
            id={group.id}
            incident_name={group.name} 
            current_active_id={this.state.current_active_id}
            incident_notes={group.summary} 
            lat={group.disturbances[0].lat} 
            lng={group.disturbances[0].lon}
            incident_time={group.timestamp}
            $hover={false}
            group_event={true}
          />
        );
    }

    if (suggestions) {
      const map_suggestions = suggestions.map((suggestion, index) =>
        <div key={index}>
          <Suggestion
            $hover={false}
            suggested_group={suggestion}
          />
          <Divider />
        </div>
      );

      const dialog_actions = [
        <RaisedButton $hover={false} key={1} label="Close" primary={true} onClick={this.display_suggestions} />
      ]
      return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100%', width: '100%', position: 'relative' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ "key": "AIzaSyAys6BYpEjD1_HFe8b9O7E-i5yVM6nyQsU" }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            center={this.state.center}
          >
            <div
              className="currentIndicator"
              lat={this.state.current_lat}
              lng={this.state.current_lon}
              $hover={false}
            >
            </div>
            <Dialog
              open={this.state.show_suggestions}
              title="Suggested Groups"
              $hover={false}
              actions={dialog_actions}
            >
              {map_suggestions}
            </Dialog>
            {map_incidents}
            {police_incidents}
            {group_incidents}
          </GoogleMapReact>

            <RaisedButton secondary={true} 
              label="List suggestions"
              onClick={this.display_suggestions}
              style={{
                position : "absolute",
                top: '10px',
                left: '10px',
                zIndex: 2
              }}
            />

        </div>
      );
    }
  }
}
