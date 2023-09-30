import React, { useState } from "react";
import "./styles/global.scss";
import IconButton from "../components/icon_button";
import SearchBar from "../components/search_bar";
import Card from "../components/card";

const Workouts = ({ workouts, onWorkoutSelect }) => {
  const [filteredItems, setFilteredItems] = useState(workouts);

  const handleAddWorkout = () => {
    console.log("add workout");
  };

  const handleCardClick = (workout) => {
    onWorkoutSelect(workout);
  };

  const handleOnSearch = (value) => {
    const filtered = workouts.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(value ? filtered : workouts);
  };

  return (
    <div className="default-screen-component-container">
      <span className="action-button">
        <IconButton theme="add" onClick={handleAddWorkout} />
      </span>
      <h1 className="text--heading">Workouts</h1>
      <SearchBar onSearch={handleOnSearch} />
      {filteredItems.map((workout) => (
        <Card key={workout.name} toDisplay={workout} onClick={() => handleCardClick(workout)} />
      ))}
    </div>
  );
};

export default Workouts;
