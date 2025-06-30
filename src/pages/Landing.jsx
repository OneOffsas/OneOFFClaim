// src/pages/Landing.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="glass-box">
        <h1>ClaimOneOff</h1>
        <p>Optimisez la gestion des réclamations logistiques e-commerce avec une solution professionnelle, intuitive et ultra rapide.</p>
        <div className="landing-buttons">
          <button onClick={() => navigate("/register")}>Créer un compte</button>
          <button onClick={() => navigate("/login")} className="secondary">Se connecter</button>
        </div>
      </div>
    </div>
  );
}

export default Landing;
