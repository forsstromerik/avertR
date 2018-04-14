import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ReportStart from '../components/ReportStart';
import ReportPhase from '../components/ReportPhase';

class Main extends Component {
    state = {}

    render() {
        //this.props.history.push({pathname: 'report-phase'});
        return(
           <BrowserRouter>
            <Switch>
              <Route path="/report-phase" component={ReportPhase} />
              <Route path="/" exact component={ReportStart} />
            </Switch>
          </BrowserRouter>
        );
    }
}

export default Main;