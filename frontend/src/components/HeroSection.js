import React from "react";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";

function HeroSection() {
  return (
    <div className="hero-container">
      <video src="/videos/video-1.mp4" autoPlay loop muted />
      <h1>MARINE FLEET PROJECT</h1>
      <p>
        Prototype of Autonomous marine fleet with camera sensors to detect
        cracks of the objects under water, with web app system for on/off of the
        device and display of data collected.
      </p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          START
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          onClick={console.log("hey")}
        >
          VIEW PROTOTYPE <i className="far fa-play-circle" />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;