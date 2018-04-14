import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import moment from 'moment';
import PendingIcon from 'material-ui/svg-icons/action/info';
import ActiveIcon from 'material-ui/svg-icons/action/report-problem';
import ResolvedIcon from 'material-ui/svg-icons/action/verified-user';
import ClosedIcon from 'material-ui/svg-icons/navigation/close';
import Gavel from 'material-ui/svg-icons/action/gavel';

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
        current_color : "",
        current_icon : ""
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

  calc_color = ()  => {
    var color = "black";
    if (this.props.police_event) {
      color = "grey";
    } else if (this.props.group_event){
      color = "purple";
    } else
    if (this.state.incident_show_suggestion_color) {
        color = "blue";
    } else {
      var status = this.props.incident_status;
        if (status === "ACTIVE") {
          color = "#f44149";
        } else if (status === "PENDING") {
          color = "#AA8A5F";
        } else if (status === "FAULTY"){
            color = "orange";
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
    
    calc_height () {
        return "50px";
    }

    calc_width () {
        return "50px" ;
    }

    render_icon (status) {
        const style = {};
        if (!status) {
          return (<Gavel style={style}/>);
        } else if (status === 'PENDING') {
          return (<PendingIcon style={style} />); 
        } else if (status === 'ACTIVE') {
          return (<ActiveIcon style={style} />); 
        } else if (status === 'RESOLVED') {
          return (<ResolvedIcon style={style}/>); 
        } else {
          return (<ClosedIcon />); 
        }
    }
  render() {
      const suggestions = this.props.incident_belonging_suggestions;
      var map_suggestions = ""
      if (suggestions) {
          map_suggestions = suggestions.map((suggestion, index) =>
              <p key={index}>
                {suggestion}
              </p>
          );
      }


      let zIndex;
      if (this.props.current_active_id === this.props.id) {
        zIndex = 2;
      } else {
        zIndex = 1;
      }

      let divStyle = {
        display : this.props.display,
        borderRadius: "50%",
        height: this.calc_height(),
        width: this.calc_width(),
        backgroundColor: this.state.current_color,
        textAlign: "center",
        color: "white",
        cursor: "pointer",
        justifyContent: 'center',
        alignItems: 'center',
        zIndex
      }

      if (divStyle.display === 'block') {
        divStyle.display = 'flex'; 
      }

      const modalStyle = {
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
                  {map_suggestions && (
                    <div>
                      <span>Suggested groups: </span>
                      {map_suggestions}
                    </div>
                  )}
                </CardText>
            </Card>
           <RaisedButton primary={true} onClick={this.open_modal} label="Close"/> 
        </div>
      ]

      const paper_children = [
          this.render_icon(this.props.incident_status)
      ]

    return (
        <div onClick={this.open_modal} style={divStyle}>
          <Paper
            style={divStyle}
            zDepth={2}
            circular={true}
            className="marker" 
            children={paper_children}
          />
          <Dialog
            style={modalStyle}
            contentStyle={modalStyle}
            title="Details"
            open={this.state.show_modal}
            actions={actions}
          >
          </Dialog>
        </div>
    );
  }
}

export default DisturbanceMapComponent;
