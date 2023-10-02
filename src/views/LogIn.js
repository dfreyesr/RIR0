import React, { useState } from "react";
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
    navigate('/sign-up');
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
      password: formValues.password.length >= 8,
      email: /^[\w-.]+@[\w-]+\.\w+(\.\w+)*$/.test(formValues.email),
    };

    setFormValidity(formValidation);
    const isFormValid = Object.values(formValidation).every(
      (value) => value === true
    );

    if (isFormValid) {
      try {
        const { email, password } = formValues;
        const url = `https://testingweb-d5b69093bb75.herokuapp.com/api/usuario/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (data.success) {
          navigate('/tracker');
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
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
      <img className="banner" src={banner} alt="Banner" />
    </div>
  );
}

export default LogIn;