import React, { Component } from 'react';
import axios from 'axios';
import Frame from '../hoc/Frame';

class ReportStart extends Component {

  state = {
    displayUndoInfo: false,
    loading: false
  }

  reportHandler = () => {
    this.setState({loading: true});
    const randLat = 59 + Math.random() * 0.5;
    const randLon = 17 + Math.random();
    axios.post('http://localhost:3000/disturbances', {
      lat: randLat,
      lon: randLon
    })
    .then((response) => {
      const id = response.data._id;
      this.setState({loading: false});      
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
      const { displayUndoInfo, loading } = this.state;
      return(
        <Frame>
          {displayUndoInfo && 
          <div className="undoInfo">Undone report successfully</div>
          }
          {loading ?
          <div className="sk-circle">
            <div className="sk-circle1 sk-child"></div>
            <div className="sk-circle2 sk-child"></div>
            <div className="sk-circle3 sk-child"></div>
            <div className="sk-circle4 sk-child"></div>
            <div className="sk-circle5 sk-child"></div>
            <div className="sk-circle6 sk-child"></div>
            <div className="sk-circle7 sk-child"></div>
            <div className="sk-circle8 sk-child"></div>
            <div className="sk-circle9 sk-child"></div>
            <div className="sk-circle10 sk-child"></div>
            <div className="sk-circle11 sk-child"></div>
            <div className="sk-circle12 sk-child"></div>
          </div> :
          <div 
            className="report-start-button"
            onClick={this.reportHandler}
            >
            <span>Report</span>
          </div>
          }
          <div className="emergency-info">
            Emergency? Do not use this service! Instead, <span>call 112.</span>
          </div>
        </Frame>
      );
  }
}

export default ReportStart;

