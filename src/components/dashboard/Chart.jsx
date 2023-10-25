import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Chart = ({ growth }) => {
  const options = {
    title: {
      text: "Percentage Growth",
    },
    series: [
      {
        data: growth,
      },
    ],
    legend: {
      enabled: false,
    },

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Chart;
