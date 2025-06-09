import React from "react";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";

function HeroSection() {
  return (
    <div className="page-container">
      {/* HERO SECTION */}
      <div className="hero-container">
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
            to="/stream" // This is now used!
          >
            START
          </Button>
          <Button
            className="btns"
            buttonStyle="btn--primary"
            buttonSize="btn--large"
            to="#prototype-details"
            isAnchor={true}
          >
            VIEW PROTOTYPE <i className="far fa-play-circle" />
          </Button>
        </div>
      </div>
      {/* END OF HERO SECTION */}

      <div className="section-divider"></div>

      {/* PROTOTYPE DETAILS */}
      <div id="prototype-details" className="container">
        <div className="image-section">
          <div className="main-image">
            <img src="/images/img-1.jpg" alt="Cam 1" />
            <span className="label">Video display</span>
          </div>

          <div className="views-grid">
            <div className="view-img">
              <img src="/images/img-1.jpg" alt="Front View" />
              <span className="label">Front View</span>
            </div>
            <div className="view-img">
              <img src="/images/img-1.jpg" alt="Left Side View" />
              <span className="label">Left Side View</span>
            </div>
            <div className="view-img">
              <img src="/images/img-1.jpg" alt="Right Side View" />
              <span className="label">Right Side View</span>
            </div>
            <div className="view-img">
              <img src="/images/img-1.jpg" alt="Bottom View" />
              <span className="label">Bottom View</span>
            </div>
          </div>
        </div>

        <div className="info-section">
          <div className="description-materials">
            <div className="description">
              <h4><strong>Description:</strong></h4>
              <p>
                The Marine Fleet Project is a prototype of an autonomous marine vehicle
                equipped with camera sensors designed to detect underwater cracks or obstacles.
                It includes a web-based control interface to turn the device on or off and to
                visualize sensor data and live camera feeds in real-time. This system enhances
                underwater inspection, safety, and monitoring without manual intervention.
              </p>
            </div>
            <div className="materials">
              <h4><strong>Materials Used:</strong></h4>
              <ul>
                <p> ESP32 Development Board – serves as the central controller that processes data from sensors and controls motors, servos, and the camera.</p>
                <p> ESP32-CAM Module – captures images or streams video underwater to detect cracks and sends visual data wirelessly.</p>
                <p> Relay Module – acts as an electronic switch to control high-power components like the motor or camera, based on the ESP32’s commands.</p>
                <p> VNH2SP30 Motor Driver – drives high-current DC motors with control over speed and direction, enabling the boat’s propulsion system.</p>
                <p> 3S LiPo Battery Pack – supplies 11.1V power to run motors and electronic components efficiently.</p>
                <p> Tupperware – used as the boat’s waterproof body or hull that houses all electronics and floats on water.</p>
                <p> Ultrasonic Sensors (3x) – placed at the front and sides to detect nearby obstacles and trigger turning actions to avoid collisions.</p>
                <p> Buck Converter – steps down the 12V from the battery to 5V for components like the ESP32 and sensors.</p>
                <p> Rudder – attached to the back of the boat and moved by the servo to change direction efficiently.</p>
                <p> Propeller – mounted on the DC motor to generate thrust and move the boat forward.</p>
                <p> DC Motor – provides rotational power to the propeller for propulsion through the water.</p>
                <p> Servo Motor – rotates the rudder to steer the boat left or right as needed.</p>
                <p> Popsicle sticks – mounted on the sides of the boat to hold the foam pieces that provide balance.</p>
                <p> Styro foam – attached to sticks to ensure the boat floats stably and evenly on water.</p>
                <p> Cardboard – used as a mounting platform inside the boat to organize and secure electronic components.</p>
                <p> LED – used as an indicator light to show system status, such as power on.</p>
                <p> PCB (Printed Circuit Board) – acts as the main board where electronic components like the ESP32, relay, and others are neatly connected and organized, providing a stable platform for signal routing and power distribution in the prototype. </p>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* END OF PROTOTYPE DETAILS */}
    </div>
  );
}

export default HeroSection;
