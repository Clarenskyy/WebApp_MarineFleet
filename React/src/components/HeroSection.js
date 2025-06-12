// src/components/HeroSection.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext"; // make sure path is correct
import "../App.css";
import "./HeroSection.css";

function HeroSection() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleStartClick = () => {
    if (isAuthenticated) {
      navigate("/stream");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="page-container">
      <div className="hero-container">
        <h1>MARINE FLEET PROJECT</h1>
        <p>
          Prototype of Autonomous marine fleet with camera sensors to detect
          cracks of the objects under water, with web app system for on/off of the
          device and display of data collected.
        </p>

        <div className="hero-btns">
          <button
            className="btns btn--outline btn--large"
            onClick={handleStartClick}
          >
            START
          </button>
          <button
            className="btns btn--primary btn--large"
            onClick={() =>
              document.getElementById("prototype-details").scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            VIEW PROTOTYPE <i className="far fa-play-circle" />
          </button>
        </div>

      </div>
    </div>
  );
}

export default HeroSection;
