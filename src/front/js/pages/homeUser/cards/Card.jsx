import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../../img/logo-GOutside.png";
import "./Card.css";

const Card = () => {
  return (
    <div className="card cards">
      <div className="cards-details">
        <img className="cards-img" src={logo} alt="/" />
      </div>
      <Link to="/competitions">
      <button className="cards-button">Más info aquí</button>
      </Link>
    </div>
  );
};

export default Card;
