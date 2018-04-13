import React, { Component } from 'react';

class DisturbanceMapComponent extends Component {
  //Show incident info
  handleClick = () => {
    alert(this.props.incident_name_prop)
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
        borderRadius: "50%",
        height: "50px",
        width: "50px",
        backgroundColor: this.calc_color(),
        textAlign: "center",
        color: "white"
      }

    return (
        <div onClick={this.handleClick} style={divStyle}>
          <h3>{this.props.incident_name_prop}</h3>
        </div>
    );
  }
}

export default DisturbanceMapComponent;
