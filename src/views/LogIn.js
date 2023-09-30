import React from "react";
import { useState, useEffect } from "react";
import Text from "../components/text";
import "./styles/login.scss";
import Input from "../components/input";
import Checkbox from "../components/checkbox";
import Button from "../components/button";
import favicon from "./static/favicon.ico";
import banner from "./static/banner.png";
import { useNavigate } from "react-router-dom";

function LogIn() {

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [formValidity, setFormValidity] = useState({
    email: true,
    password: true,
  });

  const navigate = useNavigate();

  const navigateToSignIn = () => {
    navigate('/sign-up');
  };

  const handleEmailChange = (e) => {
    setFormValues({ ...formValues, email: e.target.value });
  };


  const handlePasswordChange = (e) => {
    setFormValues({ ...formValues, password: e.target.value });
  };

  function validateForm(e) {
    e.preventDefault();
    const formValidation = {
      password: formValues.password.length >= 9,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email),
    };

    setFormValidity(formValidation);
    const isFormValid = Object.values(formValidation).every(
      (value) => value === true
    );

    if (isFormValid) {
      sendForm();
    }
  }

  function sendForm() {
    navigate('/tracker');
  }

  return (
    <div className="default-container-login">
      <img className="logo" src={favicon} alt="logo"></img>
      <div className="app">
        <form>
          <div className="title text--heading bold center">
            Your Daily Workout Tracker
          </div>
          <Input
            setInputValue={handleEmailChange}
            placeholder="Email"
            type="text"
            errorlabel="Incorrect email"
            validity={formValidity.email}
          />
          <Input
            setInputValue={handlePasswordChange}
            placeholder="Password"
            type="password"
            errorlabel="Incorrect password"
            validity={formValidity.password}
          />
          <Button text="Login" onClick={validateForm} theme="primary" />
          <span className="text--caption">
            Don't have an account?{" "}
            <a className="text--caption" onClick={navigateToSignIn}>
              Sign Up
            </a>
          </span>
        </form>
      </div>
      <img className="banner" src={banner} alt="Banner"></img>
    </div>
  );
}

export default LogIn;
