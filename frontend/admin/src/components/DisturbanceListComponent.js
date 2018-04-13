import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Grid from 'material-ui/Grid';

class DisturbanceListComponent extends Component {
    constructor(props) {
      super(props)
    }
    calc_color() {
      console.log(this.props.incident_status)
      var status = this.props.incident_status;
      if (status === "active") {
        return "#f44149";
      } else if (status === "pending") {
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
              <Grid container spacing={8}>
                <Grid item xs={6}>
                    <h3>{this.props.incident_name}</h3>
                </Grid>
                <Grid item xs={3}>
                    <p>{this.props.incident_time}</p>
                </Grid>
            </Grid>
            <p>{this.props.incident_notes}</p>
          </div>
    );
  }
}

export default DisturbanceListComponent;
