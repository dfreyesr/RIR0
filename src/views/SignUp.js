import React, { useState } from "react";
import "./styles/signup.scss";
import Input from "../components/input";
import Checkbox from "../components/checkbox";
import Button from "../components/button";
import favicon from "./static/favicon.ico";
import banner from "./static/banner.png";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [termsChecked, setTermsChecked] = useState(false);

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
    try {
      const { fn, email, password } = formValues;
      const userData = { 
        name: fn, 
        email, 
        password,
      };
  
      const response = await fetch(`${process.env.REACT_APP_API_URL}api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error(await response.text());
      }
  
      // Depending on your backend's response, handle accordingly
      alert("Registration successful");
      navigate("/log-in"); // Redirect to login after successful registration
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred while registering: " + error.message);
    }
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
            errorlabel="Email must be valid"
            validity={formValidity.email}
          />
          <Input
            setInputValue={handlePasswordChange}
            placeholder="Password"
            type="password"
            errorlabel="Password must be at least 9 characters long"
            validity={formValidity.password}
          />
          <Checkbox
            label="I accept term and conditions"
            isChecked={termsChecked}
            setChecked={setTermsChecked}
          />
          <Button text="Get started" onClick={validateForm} theme="primary" />
          <span className="text--caption">
            Already have an account?{" "}
            <button className="button-auth text--caption" onClick={navigateToLogIn}>
              Log in
            </button>
          </span>
        </form>
      </div>
      <img className="banner" src={banner} alt="hola" />
    </div>
  );
}

export default SignUp;