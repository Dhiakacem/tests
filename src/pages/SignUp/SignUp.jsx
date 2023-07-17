import React, { useState, useContext } from "react";
import * as Components from "./Components";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import "./SignUp.css";

const SignUp = () => {
  const [signIn, setSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastname] = useState("");
  const [phone, setPhone] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleSignIn = () => {
    setSignIn(true);
  };

  const toggleSignUp = () => {
    setSignIn(false);
  };

  const handleClick = () => {
    login(email, password);
    navigate("/");
  };

  // Rest of your code

  const handleClicks = async (e) => {
    e.preventDefault();
    try {
      const credentials = { email, password }; // Assuming you have email and password state variables
      const res = await axios.post("/login", credentials);
      console.log(res.data); // Access the response data

      navigate("/");
    } catch (error) {
      console.log(error.response);

      if (error.response) {
        console.log(error.response.data); // Access the error message from the response
      } else {
        console.log("Error: Request failed"); // Handle other types of errors
      }
    }
  };
  const signupClick = async (e) => {
    e.preventDefault();
    try {
      const userData = { name, lastName, phone, email, password };
      const res = await axios.post('/signup', userData);
      console.log(res.data);
      navigate('/');
    } catch (error) {
      console.log(error.response);

      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log('Error: Request failed');
      }
    }
  };


  return (
    <Components.Container>
      <Components.SignUpContainer SigninIn={signIn}>
        <Components.Form>
          <Components.Title>Create Account</Components.Title>
          <Components.Input type="text" placeholder="Name" />
          <Components.Input type="text" placeholder="LastName" />
          <Components.Input type="number" placeholder="Phone" />
          <Components.Input type="email" placeholder="Email" />
          <Components.Input type="password" placeholder="Password" />
          <Components.Button>Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>
      <Components.SignInContainer SigninIn={signIn}>
        <Components.Form>
          <Components.Title>Sign in</Components.Title>
          <Components.Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Components.Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Components.Button onClick={handleClick}>Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>
      <Components.OverlayContainer SigninIn={signIn}>
        <Components.Overlay SigninIn={signIn}>
          <Components.LeftOverlayPanel SigninIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us, please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={handleClicks}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>
          <Components.RightOverlayPanel SigninIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start the journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={signupClick}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
};

export default SignUp;
