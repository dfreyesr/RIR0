import React, { useState } from "react";
import Text from "../components/text";
import "./styles/signup.scss";
import Input from "../components/input";
import Checkbox from "../components/checkbox";
import Button from "../components/button";
import favicon from "./static/favicon.ico";
import banner from "./static/banner.png";
import { useNavigate } from "react-router-dom";
import CircularJSON from 'circular-json';

function SignUp() {
  const [termsChecked, setTermsChecked] = useState(false);
  const [trainerChecked, setTrainerChecked] = useState(false);

  const [formValues, setFormValues] = useState({
    fn: "",
    un: "",
    email: "",
    password: "",
  });

  const [formValidity, setFormValidity] = useState({
    fn: true,
    un: true,
    email: true,
    password: true,
    terms: true,
  });

  const navigate = useNavigate();

  const navigateToLogIn = () => {
    navigate("/log-in");
  };

  const handleUsernameChange = (e) => {
    setFormValues({ ...formValues, fn: e.target.value });
  };
  const handleNameChange = (e) => {
    setFormValues({ ...formValues, un: e.target.value });
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
      fn: formValues.fn !== "",
      un: formValues.un !== "",
      password: formValues.password.length >= 9,
      email: /^[\w-.]+@[\w-]+\.\w+(\.\w+)*$/.test(formValues.email),
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

  async function sendForm() {
    /*
    try {
      const { fn, un, email, password } = formValues;
      const serializableData = { fn, un, email, password };

      const response = await fetch(
        "https://testingweb-d5b69093bb75.herokuapp.com/api/usuario/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: CircularJSON.stringify(serializableData)
        }
      );

      const data = await response.json();

      if (data.success) {
        
      } else {
        alert("An error occurred while registering");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred while registering");
    }
    */
    navigate("/home");
  }

  return (
    <div className="default-container-signup">
      <img className="logo" src={favicon} alt="logo" />
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
            validity={formValidity.fn}
          />
          <Input
            setInputValue={handleUsernameChange}
            placeholder="Username"
            type="text"
            errorlabel="Insert an username"
            validity={formValidity.un}
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
            errorlabel="Incorrect password"
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
      <img className="banner" src={banner} alt="hola" />
    </div>
  );
}

export default SignUp;