import { createContext, useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../services";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [optionsData, setOptionsData] = useState([]);
  const [statussData, setStatussData] = useState([]);
  const navigate = useNavigate();

  const fetchOptionsData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/options`);
      setOptionsData(response.data);
    } catch (error) {
      console.log("Error fetching options data:", error);
    }
  };

  const checkTokenValidity = async () => {
    const token = localStorage.getItem("token");

    try {
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.post(`${API_URL}/check-token`, { token });

      if (response.status === 200) {
        setUserData(response.data);
      } else {
        navigate("/signup");
      }
    } catch (error) {
      navigate("/signup");
    }
  };

  const saveUserDataToLocalStorage = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
  };
  const login = async (email, password, e) => {
    e.preventDefault();
    try {
      const logindata = {
        email: email,
        password: password,
      };
      console.log(logindata);
      const response = await axios.post(`${API_URL}/login`, logindata, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        setUserData(response.data);
        console.log("Login successful:", response);
        toast({
          title: "Félicications...!",
          position: "top-right",
          description: "La connexion a été effectuée avec succès.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        console.log("Token expired:", response);
        toast({
          title: "Oops..!",
          position: "top-right",
          description: "Token expired .",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        navigate("/signup");
      }
    } catch (error) {
      console.log("Login error:", error);
      toast({
        title: "Oops..!",
        position: "top-right",
        description: "Une erreur est survenue.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users/${userData.id}`);
        console.log("context user ", response.data);
        setUserData(response.data);
        saveUserDataToLocalStorage(response.data);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    const fetchStatussData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/statuses/1`);
        setStatussData(response.data);
      } catch (error) {
        console.log("Error fetching status data:", error);
      }
    };

    if (userData && userData.id) {
      fetchUserData();
      fetchOptionsData();
      fetchStatussData();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ userData, optionsData, statussData, login, checkTokenValidity }}
    >
      {children}
    </UserContext.Provider>
  );
};
