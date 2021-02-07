import React from "react";
import { Bar, Line } from "react-chartjs-2";

export default function LineGraph(props) {
  const state = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Sensor Data",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: props.data,
      },
    ],
  };
  return (
    <div>
      <Line
        data={state}
        options={{
          title: {
            display: true,
            text: "Breathing Data",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
}
