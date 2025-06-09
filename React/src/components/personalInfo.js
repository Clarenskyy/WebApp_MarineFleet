import React from 'react';
import './personalInfo.css';

const PersonalInfo = () => {
  const teamMembers = [
    { 
      name: 'Aceron, Ramuel', 
      role: 'Software - Frontend Developer',
      image: '/images/ramuel.jpg',
      description: 'Developed the user interface and user experience (UI/UX) for the web application. This involved designing and implementing the visual elements, ensuring responsiveness across different devices, and creating an intuitive interface for users to interact with the systems data and functionality.  Key responsibilities included coding in HTML, CSS, and JavaScript, as well as integrating the frontend with backend APIs.'
    },
    { 
      name: 'Belicina, Andrei Lester', 
      role: 'Model/Electrical Designer - Boat Construction',
      image: '/images/andrei.jpg',
      description: "Designed and constructed the boat's physical model, including the precise placement of components and wiring.  This involved creating a stable and buoyant structure, ensuring proper placement of components for optimal functionality, and assisting with wiring and testing."
    },
    { 
      name: 'Betasa, Mark Ian', 
      role: 'Project Manager - Electrical & ESP32 Developer',
      image: '/images/mark.jpg',
      description: 'Led the hardware development, focusing on electrical components and the ESP32 microcontroller.  Responsibilities included designing the circuit board, selecting appropriate components, managing connections, and developing the firmware for the ESP32 to control the hardware and communicate with the web application.  This involved extensive testing and troubleshooting to ensure all components functioned correctly.'
    },
    { 
      name: 'Crisostomo, Joshua', 
      role: 'Machine Learning Engineer',
      image: '/images/joshua.jpg',
      description: "Integrated machine learning using Roboflow to enable crack detection in underwater images captured by the ESP32 camera. This involved training a machine learning model, optimizing its performance, and integrating it with the overall system to provide real-time crack detection capabilities."
    },
    { 
      name: 'Dela Cruz, Clarence Kieth', 
      role: 'Software - Backend Developer',
      image: '/images/klay.jpg',
      description: "Developed the server-side logic and APIs for the web application. This involved designing database schemas, writing server-side code to handle data requests, and ensuring efficient data management and security.  Responsibilities included creating and managing the application's database, implementing security measures, and ensuring seamless communication between the frontend and backend."
    },
    { 
      name: 'Diaz, Jestro', 
      role: 'Electrical Technician',
      image: '/images/jestro.jpg',
      description: 'Responsible for the soldering and connection of wires, ensuring proper and safe connections.  Guided proper wiring techniques to the team.'
    },
    { 
      name: 'Egana, Mary Elizabeth', 
      role: 'Electrical Technician - Housing Design',
      image: '/images/mary.jpg',
      description: 'Connected wires to their designated locations, sealed them with electrical tape for safety, and contributed ideas for the housing design and component arrangement.'
    },
    { 
      name: 'Geva, Nino Mynel', 
      role: 'Electrical Technician - Housing Design',
      image: '/images/mynel.jpg',
      description: "Connected wires to resistors and other components, sealed connections with electrical tape, and ensured components were correctly positioned within the housing to prevent wire tangling."
    },
    { 
      name: 'Lauron, Clarnece Cristopher', 
      role: 'Electrical Technician - Boat Construction',
      image: '/images/lauron.jpg',
      description: "Connected wires to components, ensuring proper functionality, and assisted in developing the rudder mechanism for smooth boat maneuvering."
    },
  ];

  return (
    <div className="about-page-wrapper">
      {/* Removed background video and overlay */}
      <div className="about-container">
        <div className="about-box">
          <h2 className="about-title">ROLES & INFORMATION</h2>
          <div className="profile-grid">
            {teamMembers.map((member, index) => (
              <div className="profile-card" key={index}>
                <img
                  src={member.image}
                  alt={`${member.name} Profile`}
                  className="profile-image"
                />
                <div className="profile-text">
                  <h3 className="profile-name">{member.name.toUpperCase()}</h3>
                  <h4 className="profile-role">{member.role}</h4>
                  <p className="profile-desc">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
