import React, { useState, useEffect } from "react";
import ExerciseChart from "./ExerciseChart";
import Menu from "../components/menu";
import "./styles/global.scss";

const Home = () => {
  const [chartDatas, setChartDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  const getRandomColor = (opacity = 1) => {
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
  };

  const transformDataForExercise = (exerciseName, fetchedData) => {
    const labels = fetchedData.map((workout) =>
      new Date(workout.date).toLocaleDateString()
    );

    const weightData = fetchedData.map((workout) => {
      const exercise = workout.exercises.find((e) => e.name === exerciseName);
      return exercise
        ? exercise.metrics.reduce(
            (acc, metric) => acc + Number(metric.weight),
            0
          )
        : 0;
    });

    const repsData = fetchedData.map((workout) => {
      const exercise = workout.exercises.find((e) => e.name === exerciseName);
      return exercise
        ? exercise.metrics.reduce((acc, metric) => acc + Number(metric.reps), 0)
        : 0;
    });

    return {
      labels,
      datasets: [
        {
          label: `${exerciseName} - Weight`,
          data: weightData,
          borderColor: getRandomColor(),
          backgroundColor: getRandomColor(0.5),
        },
        {
          label: `${exerciseName} - Reps`,
          data: repsData,
          borderColor: getRandomColor(),
          backgroundColor: getRandomColor(0.5),
        },
      ],
    };
  };

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/isis3710-uniandes/ISIS3710_202320_S2_E07_Front/master/endpoints/TrainingSession.json?token=GHSAT0AAAAAACK7OGFYPLSBAKWKDHOXRXIKZLNMYWQ"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((fetchedData) => {
        const allExercises = [
          ...new Set(
            fetchedData.flatMap((workout) =>
              workout.exercises.map((e) => e.name)
            )
          ),
        ];
        const allChartDatas = allExercises.map((exerciseName) =>
          transformDataForExercise(exerciseName, fetchedData)
        );
        setChartDatas(allChartDatas);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="default-screen-container">
      {!isMobileView && <Menu active="home" />}
      <div className="home-container">
        <p className="text--heading bold">Welcome, Lionel</p>
        <p className="text--subheading">
          Weight Lifting Progress Visualizations
        </p>
        <div className="graph-container">
          {chartDatas.map((data, index) => (
            <ExerciseChart key={index} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
