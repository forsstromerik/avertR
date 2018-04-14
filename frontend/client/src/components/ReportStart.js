import React, { Component } from 'react';
import axios from 'axios';
import Frame from '../hoc/Frame';
import { withRouter } from 'react-router-dom';

class ReportStart extends Component {

  state = {
    displayUndoInfo: false
  }

  reportHandler = () => {
    
    //TODO: Don't have hardcoded lat and lon
    axios.post('http://localhost:3000/disturbances', {
      lat: 59.3293235,
      lon: 18.068580800000063
    })
    .then((response) => {
      const id = response.data._id;
      this.props.history.push({pathname: `/report-phase/${id}`});
    })
    .catch(function (error) {
    })
  }

  componentDidMount() {
    const id = window.location.href.split("/").pop();
    if(id) {
      this.displayUndoInfo();
    }    
  }

  displayUndoInfo = () => {
    this.setState({displayUndoInfo: true});
    setTimeout(this.hideUndoInfo, 3000);
  }

  hideUndoInfo = () => {
    this.setState({displayUndoInfo: false})
    this.props.history.push({pathname: '/'});    
  }

  render(){
      const { displayUndoInfo } = this.state;
      return(
        <Frame>
          {displayUndoInfo && 
          <div className="undoInfo">Undone report successfully</div>
          }
          <div 
            className="report-start-button"
            onClick={this.reportHandler}
            >
            <span>Report</span>
          </div>
        </Frame>
      );
  }
}

export default withRouter(ReportStart);

