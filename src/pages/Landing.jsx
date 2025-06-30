import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="overlay">
        <div className="content">
          <h1 className="fade-in">ClaimOneOff</h1>
          <p className="fade-in delay-1">
            La plateforme intelligente pour gérer tous vos litiges logistiques e-commerce en un seul endroit.
          </p>
          <div className="buttons fade-in delay-2">
            <button onClick={() => navigate("/register")}>S'inscrire</button>
            <button onClick={() => navigate("/login")}>Se connecter</button>
            <button onClick={() => navigate("/reset-password")}>Mot de passe oublié</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
