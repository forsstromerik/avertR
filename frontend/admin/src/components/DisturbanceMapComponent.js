import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import moment from 'moment';

import Suggestion from './Suggestion.js';

class DisturbanceMapComponent extends React.Component {
  //Show incident info
  constructor(props) {
    super(props)

    this.state = {
        show_modal : false,
        time_diff : "",
        belonging_group : "",
        incident_show_suggestion_color : this.props.incident_show_suggestion_color,
        current_color : ""
    }
  }

  componentWillMount() {
    var incident_time = Date.parse(this.props.incident_time);
    var diff = moment(incident_time).fromNow();
    this.setState({
      time_diff : diff
    }) 
    this.calc_color();
  }

  open_modal= () => {
    this.setState({
      show_modal: !this.state.show_modal 
    }) 
  }

  dispatch_guard = () => {
    alert("Guard dispatched.")
  }

  calc_color = ()  => {
    var color = "black";
    if (this.state.incident_show_suggestion_color) {
        color = "blue";
    } else {
      var status = this.props.incident_status;
        if (status === "ACTIVE") {
          color = "#f44149";
        } else if (status === "PENDING") {
          color = "#e8f441";
        } else {
          color = "#41f443"
        }
      }
      this.setState({
        current_color : color
      });
  }
    componentWillReceiveProps() {
      this.setState({
        incident_show_suggestion_color : this.props.incident_show_suggestion_color
      })
      this.calc_color();
    }

  render() {
      const suggestions = this.props.incident_belonging_suggestions;
      var map_suggestions = ""
      if (suggestions) {
          map_suggestions = suggestions.map((suggestion) =>
              <p>
                {suggestion}
              </p>
          );
      }
      const divStyle = {
        borderRadius: "50%",
        height: "50px",
        width: "50px",
        backgroundColor: this.state.current_color,
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
                <CardText
                  style={titleStyle}>
                  Suggested groups: 
                  {map_suggestions}
                </CardText>
            </Card>
           <RaisedButton primary={true} onClick={this.open_modal} label="Close"/> 
           <RaisedButton primary={true} onClick={this.dispatch_guard} label="Dispatch guard"/> 
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
