import React, { useState } from "react";
import { useEffect } from "react";
import Text from "../components/text";
import "./styles/login.scss";
import Input from "../components/input";
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
    navigate("/sign-up");
  };

  const handleEmailChange = (e) => {
    setFormValues({ ...formValues, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setFormValues({ ...formValues, password: e.target.value });
  };

  const validateForm = async (e) => {
    e.preventDefault();
  
    const formValidation = {
      password: true,
      email: /^[\w-.]+@[\w-]+\.\w+(\.\w+)*$/.test(formValues.email),
    };
  
    setFormValidity(formValidation);
    const isFormValid = Object.values(formValidation).every(value => value);
  
    if (isFormValid) {
      try {
        const { email, password } = formValues;
        const response = await fetch(`${process.env.REACT_APP_API_URL}api/users/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
  
        if (!response.ok) {
          throw new Error("Invalid credentials");
        }
  
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', email);
        localStorage.setItem('userId', data.user.id); // Save user ID to local storage
  
        navigate('/home');
      } catch (error) {
        console.error("Error:", error);
        alert("Login failed: " + error.message);
      }
    }
  };
  
  

  return (
    <div className="default-container-login">
      <img className="logo" src={favicon} alt="logo" />
      <div className="app">
        <form>
          <div className="title text--heading bold center">
            Your Daily Workout Tracker
          </div>
          <Input
            setInputValue={handleEmailChange}
            placeholder="Email"
            type="text"
            errorlabel="Enter a valid email"
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
      <img className="banner" src={banner} alt="Banner" />
    </div>
  );
}

export default LogIn;
