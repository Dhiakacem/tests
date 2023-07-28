import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaSignOutAlt, FaHome, FaPlus, FaSearch, FaUser } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";
import logo from "./logonoz.png";
import { UserContext } from "../../Context/UserContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useContext(UserContext);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("token-info");
    
    setIsLoggedin(false);

    navigate("/signup");
  };

  const handleSignUp = () => {
    navigate("/SignUp");
  };
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img alt="" src={logo} className="navbar-icon" />
        </Link>
        <div className={`navbar-menu ${isOpen ? "open" : ""}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <FaHome className="nav-icon" />
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Offer" className="nav-link">
                <FaPlus className="nav-icon" />
                Trajet
              </Link>
            </li>{" "}
            <li className="nav-item">
              <Link to="/search" className="nav-link">
                <FaSearch className="nav-icon" />
                Recherche
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-icons-container">
          <div className="navbar-icons">
            {userData ? (
              <div className="dropdown">
                <button className="dropdown-toggle" onClick={toggleNavbar}>
                  <LuMenu className="nav-ic" />
                </button>
                {isOpen && (
                  <div className="dropdown-menu">
                    <Link
                      to="/Profile"
                      className="dropdown-link"
                      onClick={closeNavbar}
                    >
                      <FaUser className="dropdown-icon" />
                      Profile
                    </Link>
                    <hr className="dropdown-line" />
                    <button className="dropdown-link" onClick={logout}>
                      <FaSignOutAlt className="dropdown-icon" />
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/SignUp" className="signup-button">
                Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
