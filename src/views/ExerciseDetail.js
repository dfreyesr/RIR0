import React from "react";
import "./styles/global.scss";
import IconButton from "../components/icon_button";
import Image from "../components/image";


const ExerciseDetail = ({ exercise, onBackClick }) => {

  const isMobile = window.innerWidth <= 768;
  
  return (
    <div className="default-screen-component-container flex-sized-box">
      {isMobile && ( 
        <span className="back-button">
          <IconButton theme="arrow-left" onClick={onBackClick} />
        </span>
      )}
      <h1 className="text--heading">{exercise.name}</h1>
      <Image src={exercise.img ? exercise.img : exercise.image}/>
      <h3 className="text--body">{exercise.description}</h3>
    </div>
  );
};

export default ExerciseDetail;
