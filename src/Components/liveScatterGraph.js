import React from "react";
import CanvasJSReact from "../assets/canvasjs.react";
import { data } from "../dummyData/dummyData120points";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function LiveScatterGraph(props) {
  let chartData = [];
  for (let i = 0; i < data.length; i++) {
    chartData.push({ x: data[i].datetime, y: data[i].value });
  }
  const options = {
    theme: "light2",
    animationEnabled: true,
    zoomEnabled: true,
    axisX: {
      title: "DateTime",
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
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
        dataPoints: props.chartData,
      },
    ],
  };
  return (
    <CanvasJSChart
      options={options}
      /* onRef={ref => this.chart = ref} */
    />
  );
}
