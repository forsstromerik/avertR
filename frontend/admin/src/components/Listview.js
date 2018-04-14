import React, { Component } from 'react';
import DisturbanceListComponent from './DisturbanceListComponent.js';

class Listview extends Component {
  
  render() {
    const divStyle = {
      border : "2px solid black",
      textAlign : "center",
      width : "100%"
    }
    const incidents = this.props.incident_list;
    const list_incidents = incidents.map((incident) => 
      <DisturbanceListComponent key={incident._id} 
        incident_name={incident.name} 
        incident_notes={incident.notes} 
        incident_lat={incident.lat} 
        incident_lng={incident.lon}
        incident_time={incident.timestamp}
        incident_status={incident.status}/>
    );

    return (
          <div style={divStyle}>
            {list_incidents}
          </div>
    );
  }
}

export default Listview;
