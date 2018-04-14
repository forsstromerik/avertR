import React, { Component } from 'react';

class BarChart extends Component {
  componentDidMount() {
    const { data } = this.props;
    let ctx = document.getElementById('' + data.id).getContext('2d');
    var myChart = new window.Chart(ctx, {
      type: 'bar', data: { labels: data.keys,
        datasets: [{
          data: data.values,
          backgroundColor: 'rgba(31, 188, 211, 0.2)',
          borderColor: '#1FBCD3',
          borderWidth: 1
        }]
      },
      options: {
        responsive: false,
        title: {
          display: true,
          text: data.title
        },
        legend: { display: false },
        tooltips: {
          callbacks: {
            label: data.labelCallback ? data.labelCallback : (tooltipItem, data) => {
              let label = data.datasets[tooltipItem.datasetIndex].label || '';

              if (label) {
                label += ': ';
              }
              label += Math.round(tooltipItem.yLabel * 100) / 100;
              return label;
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              max: Math.max(...data.values) * 1.2
            }
          }]
        }
      }
    }); 
  }

  render() {
    const { data } = this.props;
    return (
      <canvas id={data.id} className="chart" width="400" height="400"></canvas>
    );
  }
}

export default BarChart;
