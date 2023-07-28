import React from "react";
import { Link } from "react-router-dom";
import {
  FaSnowflake,
  FaSmoking,
  FaLongArrowAltRight,
  FaMusic,
} from "react-icons/fa";
import { format } from "date-fns";
import "./ListItem.css";

import { useSelector } from "react-redux";

const ListItem = ({ data }) => {
  const dataSearch = useSelector((state) => state.dataSearch.dataSearch);

  const getStatus = (status) => {
    switch (status) {
      case 1:
        return (
          <span className="itemcard-status itemcard-status-available">
            Disponible
          </span>
        );
      case 2:
        return (
          <span className="itemcard-status itemcard-status-cancelled">
            Annuler
          </span>
        );
      case 3:
        return (
          <span className="itemcard-status itemcard-status-in-progress">
            En cour
          </span>
        );
      default:
        return <span className="itemcard-status">{status}</span>;
    }
  };

  if (!Array.isArray(dataSearch) || dataSearch.length === 0) {
    return (
      <div className="itemcard-container">
        <div className="itemcard-info">
          <div className="itemcard-available">Aucun trajet disponible</div>
        </div>
      </div>
    );
  }

  return (
    <div className="itemcard-container">
      <div className="itemcard-info">
        <div className="itemcard-available">
          <span className="available-label">trajets disponibles :</span>{" "}
          {dataSearch.length}
        </div>
      </div>

      <div className="itemcard-pairs">
        {dataSearch.map((trip, index) => (
          <div className="itemcard-pair" key={index}>
            <Link
              to="/Covoiturage/save"
              className={`itemcard-link ${
                trip.status === "Annuler" ? "disabled" : ""
              }`}
            >
              <div
                className={`itemcard ${
                  trip.status === "Annuler" ? "disabled" : ""
                }`}
              >
                <div className="itemcard-header">
                  <div className="itemcard-image-container">
                    {getStatus(trip.status.id)}
                  </div>
                  <div className="itemcard-price">{trip.price} TND</div>
                </div>
                <div className="itemcard-details">
                  <div className="itemcard-location">
                    <ul>
                      <li>
                        <span className="location-icon">&#128205;</span>
                        {trip.departurePoint}
                      </li>
                      <li>
                        <span className="location-icon">&#9201;</span>
                        {format(
                          new Date(trip.departureTime),
                          "dd/MM/yyyy HH:mm"
                        )}
                      </li>
                    </ul>
                  </div>
                  <span className="arrow-icon">
                    <FaLongArrowAltRight />
                  </span>
                  <div className="itemcard-location">
                    <ul>
                      <li>
                        <span className="location-icon">&#128205;</span>
                        {trip.arrivalPoint}
                      </li>
                      <li>
                        <span className="location-icon">&#9201;</span>
                        {format(new Date(trip.arrivalTime), "dd/MM/yyyy HH:mm")}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="itemcard-users">
                  <div className="itemcard-user">
                    <span className="user-icon">&#129333;</span>
                    {trip.user.name} {trip.user.lastName}
                  </div>
                  <div className="itemcard-icons">
                    {trip.options.map((icon, index) => {
                      if (icon.id === 1) {
                        return <FaSnowflake key={index} />;
                      } else if (icon.id === 2) {
                        return <FaSmoking key={index} />;
                      } else {
                        return <FaMusic key={index} />;
                      }
                    })}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListItem;
