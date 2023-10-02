import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: 'white', // Set legend label color to white
      },
    },
    title: {
      display: false,
      color: 'white', // Set title color to white
    },
  },
  scales: {
    x: {
      ticks: {
        color: 'white', // Set x-axis labels color to white
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)' // Set x-axis grid lines color (you can adjust opacity as needed)
      }
    },
    y: {
      ticks: {
        color: 'white', // Set y-axis labels color to white
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)' // Set y-axis grid lines color (you can adjust opacity as needed)
      }
    }
  }
};


const ExerciseChart = ({data}) => {
  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
};

export default ExerciseChart;
