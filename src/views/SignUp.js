import React from "react";
import { useState, useEffect } from "react";
import Text from "../components/text";
import "./styles/signup.scss";
import Input from "../components/input";
import Checkbox from "../components/checkbox";
import Button from "../components/button";
import favicon from "./static/favicon.ico";
import banner from "./static/banner.png";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [termsChecked, setTermsChecked] = useState(false);
  const [trainerChecked, setTrainerChecked] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    isTrainer: trainerChecked,
  });

  const [formValidity, setFormValidity] = useState({
    name: true,
    username: true,
    email: true,
    password: true,
    terms: true,
  });

  const navigate = useNavigate();


  const navigateToLogIn = () => {
    navigate('/log-in');
  };

  useEffect(() => {
    setFormValues({ ...formValues, isTrainer: trainerChecked });
  }, [trainerChecked]);

  const handleNameChange = (e) => {
    setFormValues({ ...formValues, name: e.target.value });
  };

  const handleUsernameChange = (e) => {
    setFormValues({ ...formValues, username: e.target.value });
  };

  const handleEmailChange = (e) => {
    setFormValues({ ...formValues, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormValues({ ...formValues, password: newPassword });
    setFormValidity({
      ...formValidity,
      password: newPassword.length >= 9,
    });
  };

  function validateForm(e) {
    e.preventDefault();
    const formValidation = {
      name: formValues.name !== "",
      username: formValues.username !== "",
      password: formValues.password.length >= 9,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email),
      terms: termsChecked,
    };

    if (!termsChecked) {
      alert("Please accept terms and conditions");
    }

    setFormValidity(formValidation);
    const isFormValid = Object.values(formValidation).every(
      (value) => value === true
    );

    if (isFormValid) {
      sendForm();
    }
  }

  function sendForm() {
    navigate('/log-in');
  }

  return (
    <div className="default-container-signup">
      <img className="logo" src={favicon} alt="logo"></img>
      <div className="app">
        <form>
          <div className="title text--heading bold center">
            Start now your fitness journey!
          </div>
          <Input
            setInputValue={handleNameChange}
            placeholder="Full Name"
            type="text"
            errorlabel="Insert your name"
            validity={formValidity.name}
          />
          <Input
            setInputValue={handleUsernameChange}
            placeholder="Username"
            type="text"
            errorlabel="Insert an username"
            validity={formValidity.username}
          />
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
            errorlabel="Insert a password with 9 characters or more"
            validity={formValidity.password}
          />
          <Checkbox
            label="I'm a trainer"
            isChecked={trainerChecked}
            setChecked={setTrainerChecked}
          />
          <Checkbox
            label="I accept term and conditions"
            isChecked={termsChecked}
            setChecked={setTermsChecked}
          />
          <Button text="Get started" onClick={validateForm} theme="primary" />
          <span className="text--caption">
            Already have an account?{" "}
            <a className="text--caption" onClick={navigateToLogIn}>
              Log in
            </a>
          </span>
        </form>
      </div>
      <img className="banner" src={banner} alt="hola"></img>
    </div>
  );
}

export default SignUp;
