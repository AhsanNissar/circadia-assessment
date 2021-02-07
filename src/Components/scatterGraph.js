import React from "react";
import Chart from "react-google-charts";
import { data } from "../dummyData/dummy1000points";
import CanvasJSReact from "../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function ScatterGraph(props) {
  let chartData = [];
  for (let i = 0; i < data.length; i++) {
    chartData.push({ x: data[i].datetime, y: data[i].value });
  }
  const options = {
    theme: "light2",
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: "Value vs DateTime (Only showing the dummy array here)",
    },
    axisX: {
      title: "DateTime",
    },
    axisY: {
      title: "Value",
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
    },
    data: [
      {
        type: "scatter",
        markerSize: 15,
        toolTipContent: "<b>DateTime: </b>{x}<br/><b>Value: </b>{y}",
        dataPoints: chartData,
      },
    ],
  };

  return (
    <div style={{ marginLeft: "auto", marginRight: "auto" }}>
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
    </div>
  );
}
