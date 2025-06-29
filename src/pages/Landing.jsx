import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

function Landing() {
  return (
    <div className="landing-container">
      <h1>Bienvenue sur ClaimOneOff</h1>
      <p>Votre portail de gestion des réclamations logistiques ultra moderne.</p>
      <div className="landing-buttons">
        <Link to="/login" className="btn">Connexion</Link>
        <Link to="/register" className="btn-outline">Inscription</Link>
      </div>
    </div>
  );
}

export default Landing;
