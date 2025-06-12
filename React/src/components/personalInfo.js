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
      description: "Designed and constructed the boat's physical model.  Responsible for the baot architecturre and construction. This involved creating a stable and buoyant structure, ensuring sufficient space for components and wiring to achieve optimal functionality."
    },
    { 
      name: 'Betasa, Mark Ian', 
      role: 'Project Manager - Head Electrical & Embedded Systems Engineer',
      image: '/images/mark.png',
      description: 'The leader of the autonomous marine fleet. Lead and oversighted all aspects of electrical system design, hardware integration, and embedded system (microcontroller) integration. Programmed and optimized the ESP32 microcontroller to meet the desired real-time performance and control requirements. Furthermore, responsible for the schematic diagram, software-hardware integration, troubleshooting and testing of the system. '
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
      role: 'Assistant Electrical Engineer',
      image: '/images/jestro.jpg',
      description: 'Assistant to the head electrical engineer. Responsible for wiring and soldering electronic components, ensuring secure and reliable connections. Also tasked with safeguarding the system by maintaining proper insulation, organization, and adherence to safety standards during assembly and operation.'
    },
    { 
      name: 'Egana, Mary Elizabeth', 
      role: 'Electrical Technician - Housing Design',
      image: '/images/mary.jpg',
      description: 'Connected wires to their designated locations, sealed them with electrical tape for Connected wires to their designated terminals, secured them using appropriate insulation methods, and contributed to the housing design and component layout to enhance system efficiency and organization.safety, and contributed ideas for the housing design and component arrangement.'
    },
    { 
      name: 'Geva, Nino Mynel', 
      role: 'Electrical Technician - Housing Design',
      image: '/images/mynel.jpg',
      description: "Responsible for the safe handling of sensors, particularly the voltage dividers, which played a critical role in protecting the sensors from overvoltage. Ensured proper installation and configuration to maintain sensor integrity and prevent potential damage during operation."
    },
    { 
      name: 'Lauron, Clarnece Cristopher', 
      role: 'Electrical Technician - Boat Construction',
      image: '/images/lauron.jpg',
      description: "Mainly responsible for the planning and procurement of materials and components needed. Also aided in wiring the system of the boat."
    },
  ];

  return (
    <div className="about-page-wrapper">
      {/* Removed background video and overlay */}
      <div className="about-container">
        <div className="about-box">
          <h2 className="about-title">TEAM</h2>
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
