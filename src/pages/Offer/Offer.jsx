import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMapPin, FiCalendar, FiClock, FiUsers } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Offer.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/Footer";
import GoogleMapsImage from "../../assets/google-maps-image.jpg";
import {
  FaCar,
  FaMoneyBillWave,
  FaMusic,
  FaSmoking,
  FaSnowflake,
} from "react-icons/fa";
import Scrollbar from "../../components/Scrollbar/Scrollbar";
import axios from "axios";
import API_URL from "../../services";
import { UserContext } from "../../Context/UserContext";

const Offer = () => {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [persons, setPersons] = useState("");
  const [price, setPrice] = useState("");

  const [optionData, setOptionsData] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState(new Set());

  const handleOptionChange = (optionId) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = new Set(prevSelectedOptions);
      if (prevSelectedOptions.has(optionId)) {
        newSelectedOptions.delete(optionId);
      } else {
        newSelectedOptions.add(optionId);
      }
      return newSelectedOptions;
    });
  };

  const optionIconMap = {
    "Option 1": <FaSnowflake className="option-icon" />,
    "Option 2": <FaSmoking className="option-icon" />,
    "Option 3": <FaMusic className="option-icon" />,
    // Add more mappings for other options if needed
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/options`);
        console.log("response options", response.data);
        setOptionsData(response.data);
      } catch (error) {
        console.log("Error fetching options data:", error);
      }
    };

    fetchOptions();
  }, []);

  const navigate = useNavigate();

  const { userData } = useContext(UserContext);

  // Fetch options data from the database when the component mounts

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const status = await axios.get(`${API_URL}/api/statuses/1`);
      const selectedOptionIds = Array.from(selectedOptions);

      const RideData = {
        departurePoint: departure,
        arrivalPoint: destination,
        departureTime: `${departureDate} ${departureTime}`,
        arrivalTime: `${departureDate} ${arrivalTime}`,
        price: price,
        places: persons,
        user: userData.id,
        status: status.data,
        options: selectedOptionIds,
      };

      console.log("rideData", RideData);

      // Save the RideData to the database
      const response = await axios.post(`${API_URL}/api/rides`, RideData);
      console.log("Server response:", response.data);

      console.log("Success");
      toast.success("Formulaire soumis avec succès !");
    } catch (error) {
      console.log(error.response);
      console.log("Error:", error.response.data);
      /*    toast.error(
        "Une erreur est survenue lors de la soumission du formulaire."
      ); */
    }
  };

  return (
    <>
      <Navbar />
      <h1 className="titres">Ajouter un trajet</h1>
      <div className="offer-container">
        <div className="input-container">
          <div className="input-group">
            <FiMapPin className="form-icon" />
            <input
              type="text"
              value={departure}
              onChange={(event) => setDeparture(event.target.value)}
              placeholder="Départ"
              className="form-input"
            />
          </div>
          <div className="input-group">
            <FiMapPin className="form-icon" />
            <input
              type="text"
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              placeholder="Destination"
              className="form-input"
            />
          </div>
          <div className="input-group">
            <FiCalendar className="form-icon" />
            <input
              type="date"
              value={departureDate}
              onChange={(event) => setDepartureDate(event.target.value)}
              placeholder="Date de départ"
              className="form-input"
            />
          </div>
          <div className="input-group">
            <FaCar className="form-icon" />
            <input
              type="time"
              value={departureTime}
              onChange={(event) => setDepartureTime(event.target.value)}
              placeholder="Heure de départ"
              className="form-input"
            />
          </div>
          <div className="input-group">
            <FiClock className="form-icon" />
            <input
              type="time"
              value={arrivalTime}
              onChange={(event) => setArrivalTime(event.target.value)}
              placeholder="Heure de départ"
              className="form-input"
            />
          </div>
          <div className="input-group">
            <FiUsers className="form-icon" />
            <input
              type="number"
              value={persons}
              onChange={(event) => setPersons(Number(event.target.value))}
              placeholder="Nombre de personnes"
              className="form-input"
            />
          </div>{" "}
          <div className="input-group">
            <FaMoneyBillWave className="form-icon" />
            <input
              type="number"
              value={price}
              onChange={(event) => setPrice(parseFloat(event.target.value))}
              placeholder="Prix"
              className="form-input"
            />
          </div>
        </div>

        <div className="select_options">
          <h3> Select option</h3>
          {optionData.map((option) => (
            <div className="option" key={option.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedOptions.has(option.id)}
                  onChange={() => handleOptionChange(option.id)}
                />
                {optionIconMap[option.name] || null}
                <span className="option-label">{option.name}</span>
              </label>
            </div>
          ))}
        </div>

        <div className="google-maps-image-container">
          <img
            src={GoogleMapsImage}
            alt="Google Maps"
            className="google-maps-image"
          />
        </div>
      </div>
      <button type="submit" className="OfferBtn" onClick={handleSubmit}>
        Ajouter
      </button>
      <ToastContainer />
      <Scrollbar />
      <Footer />
    </>
  );
};

export default Offer;
