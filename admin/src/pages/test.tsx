import React, { Component } from "react";
import Chart from "react-apexcharts";

class Test extends Component {
  constructor(props :any) {
    super(props);

    
    this.state_2 = {
        options: {},
        series: [44, 55, 41, 17, 15],
        labels: ['A', 'B', 'C', 'D', 'E']
      }
    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart"> 
            <Chart
                options={this.state.options}
                series={this.state.series}
                type="bar"
                width="500"
            />
             <Chart
                options={this.state.options}
                series={this.state.series}
                type="line"
                width="500"
            />
            <Chart options={this.state_2.options} series={this.state_2.series} type="donut" width="380" />
          </div>
        </div>
      </div>
    );
  }
}

export default Test;