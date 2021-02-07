import React from "react";
import GaugeChart from "react-gauge-chart";

export default function GuageChart(props) {
  return (
    <div>
      {/* <GaugeChart id="gauge-chart2" nrOfLevels={20} percent={props.data} /> */}
      <GaugeChart
        id="gauge-chart5"
        nrOfLevels={420}
        arcsLength={[0.3, 0.5, 0.2]}
        colors={["#5BE12C", "#F5CD19", "#EA4228"]}
        percent={props.data}
        arcPadding={0.02}
      />
    </div>
  );
}
