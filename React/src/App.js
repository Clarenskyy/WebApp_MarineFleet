// App.js
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Stream from './components/pages/Stream';
import AboutUs from "./components/pages/aboutUs";
import Login from "./components/pages/login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";

import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Background Video */}
        <div className="background-wrapper">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="background-video"
          >
            <source src="/videos/video-1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay" />
        </div>

        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/stream"
            element={
              <ProtectedRoute>
                <Stream />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
