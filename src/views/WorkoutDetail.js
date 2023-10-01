import React from "react";
import "./styles/global.scss";
import IconButton from "../components/icon_button";
import Image from "../components/image";
import Card from "../components/card";
import Button from "../components/button";


const WorkoutDetail = ({ workout, onBackClick, onButtonClick }) => {

  const isMobile = window.innerWidth <= 768;
  

  const toDisplay = {
    name:"russianTwist",
    description:"is an exercise",
    img:"https://img.livestrong.com/640/cme-data/getty%2F51780883272c474c9265289477e58ef3.jpg",
  }

  const handleStartWorkout = () => {
    onButtonClick(workout);
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
      <Card toDisplay={toDisplay} />
      <Card toDisplay={toDisplay} />
      <Card toDisplay={toDisplay} />
      <Card toDisplay={toDisplay} />
      <Card toDisplay={toDisplay} />
    </div>
  );
};

export default WorkoutDetail;
