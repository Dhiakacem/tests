import React, { useState } from "react";
import "./Featured.css";

const Featured = () => {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const cards = [
    { departure: "Sousse", arrival: "Tunis" },
    { departure: "Sfax", arrival: "Tunis" },
    { departure: "Tunis", arrival: "Sousse" },
    { departure: "Monastir", arrival: "Sousse" },
    { departure: "Kairoun", arrival: "Sousse" },
    { departure: "Sousse", arrival: "Mahdia" },
    { departure: "Nabeul", arrival: "Tunis" },
  ];

  const displayedCards = showAll ? cards : cards.slice(0, 4);

  return (
    <div className="featured-container">
      <h3 className="title">Où allez-vous ?</h3>
      <div className="card-container">
        {displayedCards.map((card, index) => (
          <div className="card" key={index}>
            <div className="departure-arrival">
              <span className="departure">{card.departure}</span>
              <span className="arrow">&rarr;</span>
              <span className="arrival">{card.arrival}</span>
            </div>
          </div>
        ))}
      </div>
      {!showAll ? (
        <button className="show-more-button" onClick={toggleShowAll}>
          Afficher plus
        </button>
      ) : (
        <button className="show-more-button" onClick={toggleShowAll}>
          Afficher moins
        </button>
      )}
    </div>
  );
};

export default Featured;
