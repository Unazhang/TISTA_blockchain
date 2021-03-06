import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class DonationProgress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Total Raised",
          data: [props.current_amount],
        },
        {
          name: "Remaining Amount",
          data: [props.remaining_amount],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 80,
          stacked: true,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "50%",
          },
        },
        dataLabels: {
          style: {
            colors: ["#fff", "000000"],
          },
        },
        colors: ["#304db0", "#e3f2fd"],
        stroke: {
          width: 0,
          colors: ["#fff"],
        },
        title: {
          text: "Goal: " + props.target_amount + " XYZ Tokens",
        },
        xaxis: {
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          labels: {
            show: false,
          },
        },
        yaxis: {
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          labels: {
            show: false,
          },
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val + "XYZ Token";
            },
          },
        },
        fill: {
          opacity: 1,
        },
        legend: {
          position: "bottom",
          horizontalAlign: "right",
          offsetX: 40,
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={200}
        />
      </div>
    );
  }
}

export default DonationProgress;
