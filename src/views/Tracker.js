import React, { useState, useEffect } from 'react';
import './styles/tracker.scss';
import Menu from '../components/menu';
import Workouts from './Workouts';
import WorkoutDetail from './WorkoutDetail';

const Tracker = ({ active }) => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showWorkoutDetail, setShowWorkoutDetail] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768); // Assuming 768px is your mobile breakpoint

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleWorkoutSelect = (workout) => {
    setSelectedWorkout(workout);
    setShowWorkoutDetail(true);
  };

  const handleBackClick = () => {
    setShowWorkoutDetail(false);
  };

  const toDisplay = [
    {
      "image": "https://img.livestrong.com/640/cme-data/getty%2F8f630f91c4f84fc581e7d54e77caec27.jpg",
      "name": "Full Body Blast",
      "description": "Arms, legs and core",
      "subdescription": "10 exercises"
    },
    {
      "image": "https://img.livestrong.com/640/cme-data/getty%2F8f630f91c4f84fc581e7d54e77caec27.jpg",
      "name": "Upper Body Strength",
      "description": "Chest, back, and arms",
      "subdescription": "8 exercises"
    },
    {
      "image": "https://img.livestrong.com/640/cme-data/getty%2F8f630f91c4f84fc581e7d54e77caec27.jpg",
      "name": "Leg Day Domination",
      "description": "Quads, hamstrings, and calves",
      "subdescription": "7 exercises"
    },
    {
      "image": "https://img.livestrong.com/640/cme-data/getty%2F8f630f91c4f84fc581e7d54e77caec27.jpg",
      "name": "Core Crunch",
      "description": "Abs and obliques",
      "subdescription": "6 exercises"
    },
    {
      "image": "https://img.livestrong.com/640/cme-data/getty%2F8f630f91c4f84fc581e7d54e77caec27.jpg",
      "name": "Pilates Pro",
      "description": "Flexibility and strength",
      "subdescription": "9 exercises"
    },
    {
      "image": "https://img.livestrong.com/640/cme-data/getty%2F8f630f91c4f84fc581e7d54e77caec27.jpg",
      "name": "Cardio Crush",
      "description": "Heart rate booster",
      "subdescription": "5 exercises"
    },
    {
      "image": "https://img.livestrong.com/640/cme-data/getty%2F8f630f91c4f84fc581e7d54e77caec27.jpg",
      "name": "Yoga Flow",
      "description": "Mind and body connection",
      "subdescription": "12 postures"
    },
    {
      "image": "https://img.livestrong.com/640/cme-data/getty%2F8f630f91c4f84fc581e7d54e77caec27.jpg",
      "name": "Calisthenics Circuit",
      "description": "Body weight training",
      "subdescription": "8 exercises"
    },
    {
      "image": "https://img.livestrong.com/640/cme-data/getty%2F8f630f91c4f84fc581e7d54e77caec27.jpg",
      "name": "Martial Arts Mix",
      "description": "Discipline and strength",
      "subdescription": "10 techniques"
    },
    {
      "image": "https://img.livestrong.com/640/cme-data/getty%2F8f630f91c4f84fc581e7d54e77caec27.jpg",
      "name": "HIIT Hype",
      "description": "Intense interval training",
      "subdescription": "6 routines"
    }
  ]; 

  return (
    <div className='default-screen-container'>

      {!isMobileView || (isMobileView && !showWorkoutDetail) ? <Menu active={active} /> : null}

      {isMobileView ? (
        showWorkoutDetail ? 
          <WorkoutDetail workout={selectedWorkout} onBackClick={handleBackClick} /> 
          : <Workouts workouts={toDisplay} onWorkoutSelect={handleWorkoutSelect} />
      ) : (
        <>
          <Workouts workouts={toDisplay} onWorkoutSelect={handleWorkoutSelect} />
          {showWorkoutDetail && <WorkoutDetail workout={selectedWorkout} onBackClick={handleBackClick} />}
        </>
      )}
    </div>
  );
}

export default Tracker;