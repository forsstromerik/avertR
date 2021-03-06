import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

class ReportStart extends Component {

  state = {
    displayUndoInfo: false,
    loading: false
  }

  reportHandler = () => {
    this.setState({loading: true});
    const randLat = 59 + Math.random() * 0.5;
    const randLon = 17 + Math.random();
    axios.post(`${BASE_URL}/disturbances`, {
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
      this.props.history.push({pathname: '/'});        
      this.displayUndoInfo();
    }    
  }

  displayUndoInfo = () => {
    this.setState({displayUndoInfo: true});
    setTimeout(this.hideUndoInfo, 3000);
  }

  hideUndoInfo = () => {
    this.setState({displayUndoInfo: false})
  }

  render(){
      const { displayUndoInfo, loading } = this.state;
      return(
        <div className="start-container">
          <div className="upper-half">
            <div className="burger">
              <div></div>
              <div></div>
              <div></div>
            </div>
            <i className="fas fa-cog cog-class"></i>
            <p>avertR</p>
            <span>Are you in an emergency? Call 112.</span>
          </div>
          <div className="bottom-half">
            {displayUndoInfo && 
            <div className="undoInfo">Successfully removed report </div>
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
            
          </div>
        </div>
      );
  }
}

export default ReportStart;

