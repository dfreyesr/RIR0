import React, { useState, useEffect } from "react";
import "./styles/global.scss";
import IconButton from "../components/icon_button";
import Button from "../components/button";
import Card from "../components/card";
import Loader from "../components/loader";

const WorkoutExercises = ({ workout, exercises, onBackClick ,onSelectedExercise, onSubmitClick}) => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    exercises
      .then(data => {
        const exercisesName = workout.exercises[0].names;
        setFilteredItems(data.filter(exercise => exercisesName.includes(exercise.name)));
        
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching workouts:", error);
        setLoading(false);
      });
  }, [exercises, workout]); 
  

  const handleCardClick = (exercise) => {
    onSelectedExercise(exercise);
  };

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="default-screen-component-container">
        <span className="back-button">
          <IconButton theme="arrow-left" onClick={onBackClick} />
        </span>
      <h1 className="text--heading">{workout.name}</h1>
      {filteredItems.map((exercise) => (
        <Card
          key={exercise.name}
          toDisplay={exercise}
          onClick={() => handleCardClick(exercise.name)}
        />
      ))}

      <Button onClick={onSubmitClick} text="Finish Workout" theme="primary"/>
   
    </div>
  );
};

export default WorkoutExercises;

