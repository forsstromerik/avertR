import React, { Component } from 'react';

import Frame from '../hoc/Frame';

class ReportStart extends Component {

  reportHandler = () => {
    this.props.history.push({pathname: '/report-phase'});
  }
    
  render(){
    //this.props.history.push({pathname: '/report-phase'});
      return(
        <Frame>
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

export default ReportStart;

