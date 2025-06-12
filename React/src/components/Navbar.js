import React, { useState, useEffect, useContext } from "react";
import { Button } from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext"; // Make sure this path is correct
import "./Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home after logout
    closeMobileMenu();
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            Autonomous Marine Fleet
            <i className="fas fa-ship" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/stream"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Stream
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/aboutUs"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              {isAuthenticated ? (
                <span className="nav-links logout-link" onClick={handleLogout}>
                  Logout
                </span>
              ) : (
                <Link
                  to="/login"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Login/Signup
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
