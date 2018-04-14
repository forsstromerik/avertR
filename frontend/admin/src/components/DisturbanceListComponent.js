import React, { Component } from 'react';
import moment from 'moment';

class DisturbanceListComponent extends Component {
    constructor(props) {
      super(props)
      this.state = {
        time_diff : ""
      }
    }
      componentWillMount() {
        var incident_time = Date.parse(this.props.incident_time);
        var diff = moment(incident_time).fromNow();
        this.setState({
          time_diff : diff
        }) 
      }
    calc_color() {
      var status = this.props.incident_status;
      if (status === "ACTIVE") {
        return "#f44149";
      } else if (status === "PENDING") {
        return "#e8f441";
      } else {
        return "#41f443"
      }
    }

  render() {
    const divStyle = {
      border : "1px solid grey",
      width : "100%",
      backgroundColor : this.calc_color()
    }

    return (
          <div style={divStyle}>
                    <h3>{this.props.incident_name}</h3>
                    <p>{this.state.time_diff}</p>
            <p>{this.props.incident_notes}</p>
          </div>
    );
  }
}

export default DisturbanceListComponent;
