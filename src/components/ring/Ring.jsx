import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
import "./ring.scss";

const Ring = ({ maxValue, value, maxColor, valueColor, height, width }) => {
  const data = {
    labels: false,
    datasets: [
      {
        label: false,
        data: [value, maxValue],
        backgroundColor: [maxColor, valueColor],
        borderWidth: 0,
        circumference: 300,
        rotation: 210,
      },
    ],
  };
  const options = {
    cutout: "74%",
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  };
  return (
    <div style={{ height: height, width: width }} className="ring">
      <Doughnut data={data} options={options}></Doughnut>
    </div>
  );
};

export default Ring;
