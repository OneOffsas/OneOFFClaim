// src/pages/Landing.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-overlay">
        <div className="landing-content">
          <h1>ClaimOneOff</h1>
          <p>La solution moderne pour gérer vos litiges logistiques e-commerce, simplement, efficacement, et sans friction.</p>
          <div className="landing-buttons">
            <button onClick={() => navigate("/register")}>Créer un compte</button>
            <button onClick={() => navigate("/login")} className="secondary-btn">Se connecter</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
