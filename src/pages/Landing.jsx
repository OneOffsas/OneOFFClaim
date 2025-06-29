import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="overlay"></div>
      <div className="content">
        <h1 className="title">ClaimOneOff</h1>
        <p className="subtitle">
          Gérez vos réclamations logistiques avec une plateforme SaaS ultra
          moderne, fluide, sécurisée.
        </p>
        <div className="buttons">
          <Link to="/login" className="btn-primary">Connexion</Link>
          <Link to="/register" className="btn-secondary">Inscription</Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
