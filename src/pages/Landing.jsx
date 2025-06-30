import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

function Landing() {
  return (
    <div className="landing">
      <div className="overlay">
        <div className="landing-content">
          <h1>🚀 ClaimOneOff</h1>
          <p>Votre plateforme SaaS pour la gestion logistique e-commerce de nouvelle génération.</p>
          <div className="landing-buttons">
            <Link to="/login"><button>Connexion</button></Link>
            <Link to="/register"><button className="btn-secondary">Créer un compte</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
