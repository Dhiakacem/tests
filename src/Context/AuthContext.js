import React, { createContext, useState, } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const toggleAuth = () => {
    setIsLoggedIn((prevValue) => !prevValue);
  };

  const login = (email, password) => {
    // Perform login authentication logic here
    // Example: Make an API call to verify credentials

    // Simulating an asynchronous API call with setTimeout
    setTimeout(() => {
      // Mocking the response
      if (email === "test@example.com" && password === "password") {
        // If login is successful
        setIsLoggedIn(true);
        setUser({ email }); // Set the user data as needed
      } else {
        // If login fails
        setIsLoggedIn(false);
        setUser(null);
      }
    }, 1000);
  };

  const logout = () => {
    // Perform logout logic here
    // Example: Clear authentication tokens, remove user data
    setIsLoggedIn(false);
    setUser(null);
  };

  // Provide the authentication state, user data, and functions to the child components
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, toggleAuth, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
