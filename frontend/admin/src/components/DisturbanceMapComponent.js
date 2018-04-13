import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import BaseMUI from './BaseMUI';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import moment from 'moment';

class DisturbanceMapComponent extends React.Component {
  //Show incident info
  constructor(props) {
    super(props)

    this.state = {
        show_modal : false,
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
  open_modal= () => {
    this.setState({
      show_modal: !this.state.show_modal 
    }) 
  }

  dispatch_guard = () => {
    alert("Guard dispatched.")
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
        borderRadius: "50%",
        height: "50px",
        width: "50px",
        backgroundColor: this.calc_color(),
        textAlign: "center",
        color: "white"
      }

      const modalStyle = {
        width: "300px",
        height: "500px",
        marginLeft: "50%" 
      }

      const titleStyle = {
        textAlign:"left" 
      }

      const actions = [
        <div>
            <Card>
                <CardHeader
                  title={this.props.incident_name}
                  subtitle={this.props.incident_time}
                  style={titleStyle}
                />
                <Divider />
                <CardTitle style={titleStyle}title="Notes:" />
              <CardText
                style={titleStyle}>
              {this.props.incident_notes}
            </CardText>
            </Card>
           <RaisedButton primary={true} onClick={this.open_modal} label="Close"/> 
           <RaisedButton secondary={true} onClick={this.dispatch_guard} label="Dispatch guard"/> 
        </div>
      ]

    return (
        <div onClick={this.open_modal} style={divStyle}>
          <h3>{this.state.time_diff}</h3>
          <Dialog
            style={modalStyle}
            contentStyle={modalStyle}
            title="Viewing detailed info"
            open={this.state.show_modal}
            actions={actions}
          >
          </Dialog>
        </div>
    );
  }
}

export default DisturbanceMapComponent;
