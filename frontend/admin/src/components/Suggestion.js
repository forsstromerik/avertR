import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
var axios = require('axios');

class Suggestion extends Component {
    constructor(props) {
      super(props)
      this.state = {
          members : [],
          show_grouping : false
      }
    }

    /* Create group */
    group_incidents = () => {
        console.log("Grouping.")
        var disturbances = this.props.suggested_group;
        var disturbances_ID_list = []
        for (var i = 0; i < disturbances.length; i++) {
          disturbances_ID_list.push(disturbances[i]._id);
        }
        var body = {}
        body.disturbances = disturbances_ID_list;
        console.log(disturbances);
        axios.post('http://localhost:3000/groups', body)
          .then(function(response){
            console.log(response);
      });  
    }

    show_modal = () => {
      this.setState({
        show_grouping : !this.state.show_grouping
      });
    }

  render() {
      const suggested_groups = this.props.suggested_group;
      console.log(suggested_groups);
      const map_incidents= suggested_groups.map((suggestion, index) =>
          <p key={index} >
            {suggestion.notes}
          </p>
      );
      const actions = [
        <div>
            <RaisedButton label="Close" onClick={this.show_modal}/> 
            <RaisedButton label="Group" onClick={this.group_incidents}/> 
        </div>
      ]

      const children = [
        <p>Would you like to group these incidents? </p>
      ]

     
    return (
        <div>
          <p onClick={this.show_modal}>Incidents:</p>
          {map_incidents}
          <Dialog
            open={this.state.show_grouping}
            actions={actions}
            children={children}
          />
        </div>
    );
  }
}

export default Suggestion;
