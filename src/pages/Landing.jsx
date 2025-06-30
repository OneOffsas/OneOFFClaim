import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
  return (
    <div className="landing-container">
      <div className="glass-box">
        <h1>ClaimOneOff</h1>
        <p>La solution tout-en-un pour gérer vos litiges e-commerce.</p>
        <div className="button-group">
          <Link to="/login" className="btn">Connexion</Link>
          <Link to="/register" className="btn">Inscription</Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
