import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import DisturbanceMapComponent from './DisturbanceMapComponent';

export default class MapComponent extends Component {
    constructor(props) {
      super(props)

      console.log(props);
    }
  static defaultProps = {
    center: {
        lat:59.329323,
        lng:18.068581
    },
    zoom: 11
  };

  render() {
    const incidents = this.props.incident_list;
    console.log(incidents);
    const map_incidents = incidents.map((incident) => 
      <DisturbanceMapComponent 
        key={incident._id} 
        incident_name={incident.name} 
        incident_notes={incident.notes} 
        lat={incident.lat} 
        lng={incident.lon}
        incident_time={incident.timestamp}
        incident_status={incident.status}/>
    );
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ "key": "AIzaSyAys6BYpEjD1_HFe8b9O7E-i5yVM6nyQsU" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        {map_incidents}
        </GoogleMapReact>
      </div>
    );
  }
}


          //<DisturbanceMapComponent
            //lat={59.329323}
            //lng={18.068581}
            //text={'Kreyser Avrora'}
          ///>
