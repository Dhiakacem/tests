import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/Footer";
import profileImage from "../../assets/Profile-image.png";
import SocialLinks from "../../components/SocialLinks/SocialLinks";
import "./Details.css";
import { FaUserEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Trajet from "../../components/Trajet/Trajet";
import API_URL from "../../services";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";

const Details = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const card = {
    id: 1,
    username: "HediUser",
    description:
      "     Un conducteur expérimenté , attentif à la sécurité de mes passagers.",
    rating: 4.5,
  };

  const renderStars = (Rating) => {
    const filledStars = Math.floor(Rating);
    const hasHalfStar = Rating % 1 !== 0;

    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(<span key={i} className="star filled" />);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star half" />);
    }

    return stars;
  };

  const { userData } = useContext(UserContext);

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

          setName(fetchedUserData.name);
          setLastName(fetchedUserData.lastName);
          setPhoneNumber(fetchedUserData.phoneNumber);
        } catch (error) {
          console.log("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [userData]);

  const saveProfile = async () => {
    try {
      const updatedUserData = {
        name,
        lastName,
        phoneNumber,
      };

      console.log("Updating user profile...", updatedUserData);

      await axios.put(`${API_URL}/api/users/${userData.id}`, updatedUserData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Profile updated successfully!");

      // Simulating a successful save
      return Promise.resolve();
    } catch (error) {
      console.log("Failed to save profile:", error);
      return Promise.reject();
    }
  };

  return (
    <>
      <Navbar />
      <SocialLinks />
      <div className="title-s">
        <h1 className="fade-out-title">Bienvenue</h1>
        <div className="profiles">
          <div className="profile-content">
            <div className="edit-icon">
              <NavLink
                to="/Profile/Edit"
                activeClassName="activated"
                className="nav-links"
              >
                <FaUserEdit className="nav-edit-icon" />
              </NavLink>
            </div>
            <h2 className="profile-title">Profil Utilisateur</h2>
            <div className="sidebar-profile">
              <img
                src={profileImage}
                alt="Profile"
                className="sidebar-profile-img"
              />
              <div className="sidebar-profile-info">
                <p className="profile-info">Nom : {name}</p>
                <p className="profile-info">Prénom: {lastName}</p>
                <p className="profile-info">Téléphone : {phoneNumber}</p>
              </div>
            </div>
            <p className="profile-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
              eros at erat suscipit condimentum. Integer consequat ex non turpis
              iaculis dapibus.
            </p>
          </div>
          <div className="rating-container">
            <h3 className="titre">Votre évaluation...</h3>
            <div className="Rate-container">
              <div className="rate position-1" key={card.id}>
                <div className="rate-profile">
                  <div className="username">
                    {name} {lastName}
                  </div>
                </div>
                <div className="description">{card.description}</div>
                <div className="rating">{renderStars(card.rating)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Trajet />
      <Footer />
    </>
  );
};

export default Details;
