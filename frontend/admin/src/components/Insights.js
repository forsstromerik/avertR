import React, { Component } from 'react';
import BarChart from './BarChart';
import HeatMapImg from './../images/heatmap.png';

class Insights extends Component {
  constructor(props) {
    super(props);

    this.state = {
      historyData: null,
      daysChartData: null,
      hoursChartData: null
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/history')
      .then(res => {
        return res.json()
      }).then(body => {
        this.setState({ historyData: body });

        const daysChartData = {
          id: 'daysChart',
          title: 'Disturbances reported by day',
          keys: Object.keys(this.state.historyData.days),
          values: Object.values(this.state.historyData.days)
        };
        const hoursChartData = {
          id: 'hoursChart',
          title: 'Disturbances reported by hour',
          keys: Object.keys(this.state.historyData.hours),
          values: Object.values(this.state.historyData.hours),
          labelCallback: (tooltipItem, data) => {
            let label = data.datasets[tooltipItem.datasetIndex].label || '';

            if (label) {
              label += ': ';
            }
            label += Math.round(tooltipItem.yLabel * 100) / 100;

            // add percentage
            let sum = 0;
            data.datasets[0].data.map(val => {
              sum += val; 
            });
            let percentage = Math.round((tooltipItem.yLabel / sum) * 100)

            return label + ' (' +  percentage + '%)';
          }
        };
        this.setState({ daysChartData, hoursChartData });
      })
  }

  render() {
    return (
      <div>
        <div id="charts-wrapper">
          <h2>Data insights</h2>
          <h3>Statistics</h3>
          <div>
            {this.state.daysChartData &&
            <BarChart data={this.state.daysChartData} />
            }
            {this.state.hoursChartData &&
            <BarChart data={this.state.hoursChartData} />
            }
          </div>
        </div>
        <div style={{ paddingLeft: '50px', margin: '50px 0' }} id="map-wrapper">
          <h3>Heatmap</h3>
          <img style={{ width: '50%' }} src={HeatMapImg} />

        </div>
      </div>
    );
  }
}

export default Insights;
