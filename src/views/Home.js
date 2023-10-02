import React, { useState, useEffect } from "react";
import Menu from "../components/menu";
import "./styles/global.scss";

const Home = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



const uniqueExercises = [...new Set(workoutData.flatMap(day => day.name.exercises))];

let dates = workoutData.map(d => new Date(d.date).toLocaleDateString());
let datasets = [];

uniqueExercises.forEach(exercise => {
    let setsData = [];
    let repsData = [];
    let avgWeightData = [];
    
    workoutData.forEach(day => {
        let dayExercise = day.exercises.find(e => e.name === exercise);
        if(dayExercise) {
            setsData.push(dayExercise.metrics.length);
            
            let totalReps = dayExercise.metrics.reduce((acc, metric) => acc + Number(metric.reps), 0);
            repsData.push(totalReps);
            
            let totalWeight = dayExercise.metrics.reduce((acc, metric) => acc + Number(metric.weight), 0);
            let averageWeight = dayExercise.metrics.length ? totalWeight/dayExercise.metrics.length : 0;
            avgWeightData.push(averageWeight);
        } else {
            setsData.push(0);
            repsData.push(0);
            avgWeightData.push(0);
        }
    });

    datasets.push({
        label: `${exercise} - Sets`,
        data: setsData,
        fill: false,
        borderColor: 'red'
    });

    datasets.push({
        label: `${exercise} - Total Reps`,
        data: repsData,
        fill: false,
        borderColor: 'green'
    });

    datasets.push({
        label: `${exercise} - Avg Weight`,
        data: avgWeightData,
        fill: false,
        borderColor: 'blue'
    });
});


  return (
    <div className="default-screen-container">
      {!isMobileView ? <Menu active="home" /> : null}
      <p className="text--subheading bold">Hi, Lionel</p>
      <p className="text--subheading">Weight Lifting Progress</p>
    </div>
  );
};

export default Home;
