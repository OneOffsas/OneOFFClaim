import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="overlay"></div>
      <div className="landing-content">
        <h1 className="main-title">ClaimOneOff</h1>
        <p className="subtitle">
          Optimisez la gestion de vos litiges logistiques e-commerce avec une plateforme moderne, efficace et intuitive.
        </p>
        <div className="cta-buttons">
          <button onClick={() => navigate("/register")} className="btn-primary">
            S'inscrire
          </button>
          <button onClick={() => navigate("/login")} className="btn-secondary">
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
