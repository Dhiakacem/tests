import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./Profile.css";
import profileImage from "../../assets/Profile-image.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Scrollbar from "../../components/Scrollbar/Scrollbar";
import axios from "axios";
import API_URL from "../../services";
import { UserContext } from "../../Context/UserContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Profile = () => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showTitle, setShowTitle] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { userData } = useContext(UserContext);

  const handleEdit = () => {
    navigate("/profile");
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Update the user profile with the new data
      const phoneNumberInt = parseInt(phoneNumber);
      const updatedUserData = {
        name: name,
        lastName: lastName,
        phoneNumber: phoneNumberInt,
      };

      await axios.put(`${API_URL}/api/users/${userData.id}`, updatedUserData);

      // Display success message
      toast.success("Profile saved successfully!");

      // Redirect to the profile page after saving successfully
      navigate("/profile");
    } catch (error) {
      console.log("Failed to save profile:", error);
      // Display error message
      toast.error("Failed to save profile. Please try again later.");
    }
  };

  useEffect(() => {
    if (userData && userData.id) {
      const fetchUserData = async () => {
        try {
          console.log("Fetching user data...");
          const response = await axios.get(
            `${API_URL}/api/users/${userData.id}`
          );
          const fetchedUserData = response.data;

          console.log("Fetched user data:", fetchedUserData);
          setUserName(fetchedUserData.username);
          setName(fetchedUserData.name);
          setLastName(fetchedUserData.lastName);
          setEmail(fetchedUserData.email);
          setPhoneNumber(fetchedUserData.phoneNumber);
        } catch (error) {
          console.log("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [userData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <div className="title-container">
        {showTitle && <h1 className="fade-out">Bienvenue</h1>}
        {!showTitle && <h1 className="fade-in">Consultez votre profil</h1>}
      </div>
      <div className="profile-container">
        <div className="main-content">
          <div className="sidebar">
            <div className="sidebar-content">
              <h2>Profil utilisateur</h2>
              <div className="sidebar-profile">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="sidebar-profile-img"
                />
                <div className="sidebar-profile-info">
                  <p>
                    <strong>Nom d'utilisateur :</strong> {username}
                  </p>
                  <p>
                    <strong>Nom :</strong> {name}
                  </p>
                  <p>
                    <strong>Prénom :</strong> {lastName}
                  </p>
                  <p>
                    <strong>Téléphone :</strong> {phoneNumber}
                  </p>
                </div>
              </div>
              <p>
                Un conducteur expérimenté, attentif à la sécurité de mes
                passagers. Je possède une excellente expérience de conduite et
                suis respectueux des règles de la route.
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="edit-profile-form">
            <div className="form-group">
              <label htmlFor="phone">Nom d'utilisateur :</label>
              <input
                type="text"
                id="phone"
                value={username}
                onChange={handleUserNameChange}
                className="form-input"
                disabled
              />
            </div>

            <div className="form-group">
              <label htmlFor="form-label">Nom :</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                className="form-input"
                required
              />

              <label htmlFor="lastName">Prénom :</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={handleLastNameChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Téléphone :</label>
              <input
                type="text"
                id="phone"
                value={phoneNumber}
                onChange={handlePhoneChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                id="email"
                value={userData?.email || ""}
                disabled
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe :</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"} // Show or hide the password based on showPassword state
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="form-input"
                />
                <button
                  type="button"
                  className="password-toggle-button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="button-group">
              <button
                type="button"
                className="form-button save-button"
                onClick={handleEdit}
              >
                Retour
              </button>
              <button type="submit" className="form-button return-button">
                Enregistrer
              </button>
            </div>
            <ToastContainer />
          </form>
        </div>
      </div>
      <Footer />
      <Scrollbar />
    </>
  );
};

export default Profile;
