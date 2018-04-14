import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import ListView from './Listview';
import MapComponent from './MapComponent';

class Home extends Component {
  constructor(props) {
      super(props);

      this.state = {
        incidents : []
      }
  }

  fetchIncidents() {
    fetch('http://localhost:3000/disturbances', {
      method: 'GET'
    })
      .then(function (res) {
        return res.json()
      })
      .then(function (json) {
        this.setState({
          incidents : json
        })
      }.bind(this))
      .catch((error) => {
        console.log(error);
      });

  }

  componentDidMount() {
    this.fetchIncidents(); 
  }

  render() {
    return (
      <Grid fluid style={{ maxHeight: '700px' }}>
        <Row>
          <Col xs={3} style={{ maxHeight: '700px', overflow: 'scroll' }}>
            <ListView incident_list={this.state.incidents} />
          </Col>
          <Col xs={9}>
            <MapComponent incident_list={this.state.incidents}/>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Home;
