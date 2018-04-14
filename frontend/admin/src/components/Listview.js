import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import moment from 'moment';
import PendingIcon from 'material-ui/svg-icons/action/info';
import ActiveIcon from 'material-ui/svg-icons/action/report-problem';
import ResolvedIcon from 'material-ui/svg-icons/action/verified-user';
import ClosedIcon from 'material-ui/svg-icons/navigation/close';

class Listview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeDisturbanceID: 0
    };
  }

  disturbanceClicked = (id) => {
    this.setState({ activeDisturbanceID: id });
  }

  renderIcon = (status) => {
    if (status === 'PENDING') {
      return (<PendingIcon />); 
    } else if (status === 'ACTIVE') {
      return (<ActiveIcon />); 
    } else if (status === 'RESOLVED') {
      return (<ResolvedIcon />); 
    } else {
      return (<ClosedIcon />); 
    }
  }

  render() {
    const incidents = this.props.incident_list;

    return (
      <List>
        <Subheader>Disturbances</Subheader>
        {incidents.map(el => {
          if (!el.notes) {
            el.notes = 'No notes available'; 
          }

          const avatarStyle = {
            backgroundColor: this.state.activeDisturbanceID === el._id ? '#1FBCD3' : 'rgb(117, 117, 117)'
          };
          return (
            <ListItem
              key={el._id}
              leftAvatar={<Avatar style={avatarStyle} icon={this.renderIcon(el.status)} />}
              primaryText={moment(el.timestamp).format('MMMM Do, h:mm:ss')}
              secondaryText={el.notes}
              onClick={() => { this.disturbanceClicked(el._id); }} />
          );
        })}
      </List>
    );
  }
}

export default Listview;
