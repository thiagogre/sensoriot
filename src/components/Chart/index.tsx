import React from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";

const Chart = ({ data }: any) => {
  const chartData = {
    labels: data.map((item: any) =>
      format(new Date(item.createdAt), "dd/MM/yyyy HH:mm:ss")
    ),
    datasets: [
      {
        label: "Valor",
        data: data.map((item: any) => item.value),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default Chart;
