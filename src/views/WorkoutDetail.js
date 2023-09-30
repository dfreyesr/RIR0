import React from "react";
import "./styles/global.scss";
import IconButton from "../components/icon_button";
import SearchBar from "../components/search_bar";

const WorkoutDetail = ({ workout, onBackClick }) => {

  const isMobile = window.innerWidth <= 768;

  return (
    <div className="default-screen-component-container flex-sized-box">
      {isMobile && ( 
        <span className="back-button">
          <IconButton theme="arrow-left" onClick={onBackClick} />
        </span>
      )}
      <h1 className="text--heading">{workout.name}</h1>
      <SearchBar />
    </div>
  );
};

export default WorkoutDetail;
