import { Line } from 'react-chartjs-2';

function ExerciseChart() {
    const chartData = {
        labels: dates,
        datasets: datasets
    };

    return (
        <Line 
            data={chartData}
            options={{
                responsive: true,
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }}
        />
    );
}

export default ExerciseChart;
