import React, { useState, useEffect } from "react";
import "./styles/global.scss";
import Image from "../components/image";
import Card from "../components/card";
import Button from "../components/button";
import IconButton from "../components/icon_button";


const WorkoutDetail = ({ workout, onBackClick, onButtonClick }) => {
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (workout && workout.exercises) {
      setFilteredItems(workout.exercises);
    }
  }, [workout]);

  const isMobile = window.innerWidth <= 768;
  
  const handleStartWorkout = () => {
    onButtonClick(workout);
  }

  const handleCardClick = (description) => {
    alert("Exercise info: " + description);
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
