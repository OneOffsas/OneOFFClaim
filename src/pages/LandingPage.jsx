import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-overlay">
        <h1 className="landing-title">ClaimOneOff</h1>
        <p className="landing-subtitle">
          Optimisez la gestion de vos <strong>litiges logistiques</strong><br />
          avec notre solution SaaS intelligente.
        </p>
        <div className="landing-buttons">
          <button className="btn-login" onClick={() => navigate("/login")}>
            Se connecter
          </button>
          <button className="btn-register" onClick={() => navigate("/register")}>
            S’inscrire
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
