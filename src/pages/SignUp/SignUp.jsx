import React, { useState } from "react";
import * as Components from "./Components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";
import API_URL from "../../services";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";


const SignUp = () => {
  const [signIn, setSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [genre, setGenre] = useState("");
  const {login} = useContext(UserContext)

  const toggleSignIn = () => {
    setSignIn(true);
  };

  const toggleSignUp = () => {
    setSignIn(false);
  };

  /*  */
  

  const signupClick = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        name: name,
        lastName: lastName,
        username: username,
        phoneNumber: phone,
        gender: genre,
        email: email,
        password: password,
      };
      console.log(userData);
      const res = await axios.post(`${API_URL}/signup`, userData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("res.data", res.data);
      console.log("User registered successfully");
    } catch (error) {
      console.log("error", error);

      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log("Error: Request failed");
      }
    }
    console.log("Sign In:", signIn);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Name:", name);
    console.log("Last Name:", lastName);
    console.log("Phone:", phone);
    console.log("username:", username);
    console.log("genre:", genre);
  };

  return (
    <>
      <Components.Container>
        <Components.SignUpContainer signinin={signIn}>
          <Components.Form>
            <Components.Title>Create Account</Components.Title>
            <Components.Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Components.Input
              type="text"
              placeholder="LastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Components.Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />{" "}
            <Components.Input
              type="number"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Components.Input
              type="text"
              placeholder="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />{" "}
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
            />{" "}
            <Components.Button onClick={signupClick}>Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>
        <Components.SignInContainer signinin={signIn}>
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
            <Components.Button onClick={(e)=>login(email,password,e)}>Sign In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>
        <Components.OverlayContainer signinin={signIn}>
          <Components.Overlay signinin={signIn}>
            <Components.LeftOverlayPanel signinin={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us, please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={toggleSignIn}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>
            <Components.RightOverlayPanel signinin={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter your personal details and start the journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={toggleSignUp}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
      <ToastContainer />
    </>
  );
};

export default SignUp;
