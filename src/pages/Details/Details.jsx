import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/Footer";
import profileImage from "../../assets/Profile-image.png";
import SocialLinks from "../../components/SocialLinks/SocialLinks";
import "./Details.css";
import { FaUserEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Trajet from "../../components/Trajet/Trajet";

const Details = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const card = {
    id: 1,
    name: "John",
    Lastname: "Doe",
    description: "Travel enthusiast from New York",
    rating: 4.5,
  };

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(<span key={i} className="star filled" />);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star half" />);
    }

    return stars;
  };

  return (
    <>
      <Navbar />
      <SocialLinks />
      <div className="title-s">
        <h1 className="fade-out-title">Welcome back</h1>
        <div className="profiles">
          <div className="profile-content">
            <div className="edit-icon">
              <NavLink
                to="/edit"
                activeClassName="activated"
                className="nav-links"
              >
                <FaUserEdit className="nav-icon" />
              </NavLink>
            </div>
            <h2 className="profile-title">User Profile</h2>

            <div className="sidebar-profile">
              <img
                src={profileImage}
                alt="Profile"
                className="sidebar-profile-img"
              />
              <div className="sidebar-profile-info">
                <p className="profile-info">Name: {name}</p>
                <p className="profile-info">Last Name: {lastName}</p>
                <p className="profile-info">Phone: {phone}</p>
              </div>
            </div>
            <p className="profile-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
              eros at erat suscipit condimentum. Integer consequat ex non turpis
              iaculis dapibus.
            </p>
          </div>

          <div className="rating-container">
            <h3 className="titre">Your Rating...</h3>
            <div className="Rate-container">
              <div className="rate position-1" key={card.id}>
                <div className="rate-profile">
                  <div className="username">
                    {card.name}
                    <div>{card.Lastname}</div>
                  </div>
                </div>
                <div className="description">{card.description}</div>
                <div className="rating">{renderStars(card.rating)}</div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
      <Trajet />
      <Footer />
    </>
  );
};

export default Details;
