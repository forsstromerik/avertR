import React, { Component } from 'react';

//Internal

class Polyline extends Component {
    constructor(props) {
      super(props)
      this.state = {
          start_lat : 0,
          start_lon : 0,
          end_lat : 0,
          end_lon : 0
      }
    }

  render() {

    window.renderFlights = function() {
        var flightPlanCoordinates = [
        {lat: 37.772, lng: -122.214},
        {lat: 21.291, lng: -157.821},
        {lat: -18.142, lng: 178.431},
        {lat: -27.467, lng: 153.027}
    ]
    var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    })

    flightPath.setMap(window.map)
}

<GoogleMap ref={(map) => {window.map = map; window.renderFlights()}}></GoogleMap>
    return (
        <div>
          <p>Hi</p>
        </div>
    );
  }
}

export default Polyline;
