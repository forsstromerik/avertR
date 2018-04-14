import React, { Component } from 'react';

class Insights extends Component {
  constructor(props) {
    super(props);

    this.state = {
      historyData: null
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/history')
      .then(res => {
        return res.json()
      }).then(body => {
        this.setState({ historyData: body });
      })
  }

  renderCharts() {
    var ctx = document.getElementById("daysChart").getContext('2d');
    var myChart = new window.Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(this.state.historyData.days),
        datasets: [{
          label: '# of disturbances',
          data: Object.values(this.state.historyData.days),
          backgroundColor: 'rgba(31, 188, 211, 0.2)',
          borderColor: '#1FBCD3',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    }); 


    var ctx = document.getElementById("hoursChart").getContext('2d');
    var myChart = new window.Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(this.state.historyData.hours),
        datasets: [{
          label: '# of disturbances',
          data: Object.values(this.state.historyData.hours),
          backgroundColor: 'rgba(31, 188, 211, 0.2)',
          borderColor: '#1FBCD3',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    }); 


  }

  render() {
    if (this.state.historyData) {
      this.renderCharts();
    }

    return (
      <div>
        <canvas id="daysChart" class="chart" width="400" height="400"></canvas>
        <canvas id="hoursChart" class="chart" width="400" height="400"></canvas>
      </div>
    );
  }
}

export default Insights;
