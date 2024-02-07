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

const ExerciseChart = ({ data, dataType }) => {
  const yAxisLabel = dataType === 'reps' ? 'reps' : 'kg';

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // This hides the legend
        labels: {
          color: 'white',
        },
      },
      title: {
        display: false,
        color: 'white',
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: 'white',
          callback: function(value, index, values) {
            return `${value} ${yAxisLabel}`;
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
};

export default ExerciseChart;
