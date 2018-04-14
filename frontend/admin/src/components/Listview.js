import React, { Component } from 'react';
import DisturbanceListComponent from './DisturbanceListComponent.js';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import moment from 'moment';
import PendingIcon from 'material-ui/svg-icons/action/info';
import ActiveIcon from 'material-ui/svg-icons/action/report-problem';
import ResolvedIcon from 'material-ui/svg-icons/action/verified-user';
import ClosedIcon from 'material-ui/svg-icons/navigation/close';
import Gavel from 'material-ui/svg-icons/action/gavel';
import { Grid, Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';

class Listview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeDisturbanceID: 0,
      display_incidents : this.props.display_incidents,
      display_police: this.props.display_police,
      display_groups: this.props.display_groups
    };
  }

  disturbanceClicked = (el) => {
    this.setState({ activeDisturbanceID: el._id });
    var coords = [el.lat, el.lon];
    var id = el._id
    this.props.newIDs.map(id => {
      if (id === el._id) {
        this.props.removeNewID(el._id);
      } 
    });

    this.props.callback(coords, id);
  }

  renderIcon = (status, is_police) => {
    let style = { fill: 'black' };
    if (is_police == 'POLICE') {
      return (<Gavel style={style} />);
    } else
    if (status === 'PENDING') {
      return (<PendingIcon style={style} />); 
    } else if (status === 'ACTIVE') {
      return (<ActiveIcon style={style} />); 
    } else if (status === 'RESOLVED') {
      return (<ResolvedIcon style={style} />); 
    } else {
      return (<ClosedIcon style={style} />); 
    }
  }

  isVisible = (type) => {
    if (type === 'INCIDENT') {
      return this.props.display_incidents;
    } else if (type === 'GROUP') {
      return this.props.display_groups;
    } else {
      return this.props.display_police;
    }
  }

  calc_color = (info) => {
    if (info._id === this.state.activeDisturbanceID) {
      return "#1FDBCD3";
    } else if (info.type === "POLICE") {
      return "grey";
    } else if (info.status === "ACTIVE"){
      return "red"
    } else if (info.status === "PENDING"){
      return "#AA8A5F";
    } else {
      return "#FDA429";
    }
    //backgroundColor: this.state.activeDisturbanceID === el._id ? '#1FBCD3' : 'rgb(117, 117, 117)'
  }

  render() {
    const incidents = this.props.incident_list;
    for (var i = 0; i < incidents.length; i++) {
      incidents[i].type = 'INCIDENT';
    }
    const police_incidents = this.props.police_incidents;
    for (var i = 0; i < police_incidents.length; i++) {
      police_incidents[i].type = 'POLICE';
    }
    const group_incidents = this.props.group_incidents;
    for (var i = 0; i < group_incidents.length; i++) {
      group_incidents[i].type = 'GROUP';
    }

    var big_list = incidents.concat(police_incidents);
    var biggest_list = big_list;
    
    //For every group ...
    for (var i = 0; i < group_incidents.length; i++) {
      //Push all incidents in that group
        for (var j = 0; j < group_incidents[i].disturbances.length; j++) {
          group_incidents[i].disturbances[j].type = 'GROUP';
          biggest_list.push(group_incidents[i].disturbances[j])
        }
    }

    //Filters
    return (
      <div>
      <List>
        <Subheader>Disturbances</Subheader>
        {biggest_list.map(el => {
          if (!el.notes) {
            el.notes = 'No notes available'; 
          }
          const avatarStyle = {
            backgroundColor: this.calc_color(el),
            color: 'black'
          };
          const styles = {
            display: this.isVisible(el.type)
          };

          let classes = 'listitem';

          let found = false;
          this.props.newIDs.map(id => {
            if (el._id === id) {
              found = true;
              classes += ' new';
            }
          });

          if (!found) {
            if (el._id === this.state.activeDisturbanceID) {
              classes += ' active';
            }
          }

          return (
            <ListItem
              key={el._id }
              leftAvatar={<Avatar style={avatarStyle} icon={this.renderIcon(el.status, el.type)} />}
              primaryText={moment(el.timestamp).format('MMMM Do, h:mm')}
              secondaryText={el.notes}
              style={styles}
              className={classes}
              onClick={() => { this.disturbanceClicked(el); }} />
          );
        })}
      </List>
      </div>
    );
  }
}

export default Listview;
