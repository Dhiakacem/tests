import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faCalendarDays,
  faCar,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import API_URL from "../../services";
import axios from "axios";
import ListItem from "../ListItem/ListItem";

import { useDispatch, useSelector } from "react-redux";
import { setDataSearch } from "../../Redux/Expense/expenseConfig";

import "./SearchBar.css";

function SearchBar() {
  const [personCount, setPersonCount] = useState(0);
  const [departurePoint, setDeparture] = useState("");
  const [arrivalPoint, setArrivalPoint] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dataSearch = useSelector((state) => state.dataSearch.dataSearch);
  const dispatch = useDispatch();

  const handlePersonChange = (e) => {
    let count = parseInt(e.target.value);
    if (isNaN(count)) {
      count = 0;
    } else if (count < 0) {
      count = 0;
    } else if (count > 4) {
      count = 4;
    }
    setPersonCount(count);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Departure:", departurePoint);
    console.log("Arrival Point:", arrivalPoint);
    console.log("Date:", date);
    console.log("Person Count:", personCount);
    navigate(
      `/covoiturage?departure=${departurePoint}&arrival=${arrivalPoint}&date=${date}&person=${personCount}`
    );
  };

  useEffect(() => {
    const fetchCarpoolings = async () => {
      try {
        console.log("Fetching carpoolings...");
        const response = await axios.get(`${API_URL}/api/rides`, {
          params: {
            page: 1,
            departurePoint: departurePoint,
            arrivalPoint: arrivalPoint,
          },
        });
        const data = response.data;
        console.log("Fetched data:", data);

        dispatch(setDataSearch(data));

        setLoading(false);
      } catch (err) {
        console.log("Error fetching data:", err);
        setError("Failed to fetch data: " + err.message);
        setLoading(false);
      }
    };

    fetchCarpoolings();
  }, [dispatch, departurePoint, arrivalPoint]);
    

  return (
    <div className="Search-container">
      <h3 className="title">Où allez-vous ?</h3>
      <div className="containers">
        <form className="search-form" onSubmit={handleSearch}>
          <div className="input-container">
            <FontAwesomeIcon
              icon={faArrowAltCircleRight}
              className="input-icon"
            />
            <input
              type="text"
              placeholder="De"
              value={departurePoint}
              onChange={(e) => setDeparture(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <FontAwesomeIcon icon={faCar} className="input-icon" />
            <input
              type="text"
              placeholder="À"
              value={arrivalPoint}
              onChange={(e) => setArrivalPoint(e.target.value)}
            />
          </div>
          <div className="input-container">
            <FontAwesomeIcon icon={faCalendarDays} className="input-icon" />
            <input
              type="date"
              placeholder="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="input-container">
            <FontAwesomeIcon icon={faPerson} className="input-icon" />
            <input
              type="number"
              placeholder="Personne"
              name="person"
              min="0"
              max="4"
              value={personCount}
              onChange={handlePersonChange}
            />
          </div>
          <div className="headerSearchItem">
            <button className="headerBtn" type="submit">
              Rechercher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
