import React from "react";
import "./styles/global.scss";
import IconButton from "../components/icon_button";
import Image from "../components/image";
import Card from "../components/card";
import Button from "../components/button";
import Loader from "../components/loader";
import { useState,useEffect } from "react";


const WorkoutDetail = ({ exercises,workout, onBackClick, onButtonClick }) => {

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

  const isMobile = window.innerWidth <= 768;
  
  const handleStartWorkout = () => {
    onButtonClick(workout);
  }

  const handleCardClick = (description) => {
    alert("Exercise info: " + description);
  }

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="default-screen-component-container flex-sized-box">
      {isMobile && ( 
        <span className="back-button">
          <IconButton theme="arrow-left" onClick={onBackClick} />
        </span>
      )}
      <h1 className="text--heading">{workout.name}</h1>
      <Image src={workout.img}/>
      <h3 className="text--body">{workout.description}</h3>
      <Button text="Start Workout" theme="primary" onClick={handleStartWorkout} />
      {filteredItems.map((exercise) => (
        <Card
          key={exercise.name}
          toDisplay={exercise}
          onClick={() => handleCardClick(exercise.description)}
        />
      ))}
    </div>
  );
};

export default WorkoutDetail;
