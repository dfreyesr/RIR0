import React from "react";
import "./styles/landing.scss";
import Button from "../components/button";
import favicon from "./static/favicon.ico";
import landing_banner from "./static/landing-banner.png";
import { useNavigate } from 'react-router-dom';
import graphs from "./static/graphs.png";

function Landing() {

  const navigate = useNavigate();

  const navigateToSignIn = () => {
    navigate('/sign-up');
  };

  const navigateToLogIn = () => {
    navigate('/log-in');
  };

  return (
    <div className="default-container-landing">
      <img className="logo" src={favicon} alt="logo"></img>
      <div className="gray-rectangle top"></div>
      <img
        className="landing-banner"
        src={landing_banner}
        alt="landing-banner"
      ></img>
      <div className="gray-rectangle content">
        <div className="text--landing landing-title">
          RECORDING YOUR GAINS NEVER BEEN EASIER
        </div>
        <div className="button-container">
          <Button onClick={navigateToSignIn} text="Sign Up" theme="primary-landing" />
          <Button onClick={navigateToLogIn} text="Log In" theme="secondary-landing" />
        </div>
        <img src={graphs} alt="Graphs"></img>
        <div className="description">
          <span className="text--landing landing-subtitle">What is RIR 0?</span>
          <span className="text--subheading bold center">
            Made by athletes for athletes.
          </span>
          <span className="text--body center">
            RIR 0 provides a innovative solution for athletes and trainers to
            create and use workouts, record their metrics, visualize their data
            and predict their future performance.
          </span>
        </div>
        <div className="metrics">
          <span className="metric">
            <span className="text--landing landing-title landing-color ">100+</span>
            <span className="text--body">Exercises on our database</span>
          </span>
          <span className="metric">
            <span className="text--landing landing-title landing-color">30+</span>
            <span className="text--body">Featured workouts</span>
          </span>
          <span className="metric">
            <span className="text--landing landing-title landing-color">5+</span>
            <span className="text--body">Visualization for your training data</span>
          </span>
        </div>
      </div>

      <div className="cta text--landing landing-cta">
      WRITE DOWN YOUR METRICS LIKE NEVER BEFORE
        <Button onClick={navigateToSignIn} text="Join Us Now!" theme="primary"/>
      </div>

      <footer className="text--body bold">
      <span className="material-symbols-outlined">
copyright
</span> Copyright RIR 0
      </footer>
    </div>
  );
}

export default Landing;
