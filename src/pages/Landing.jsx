import React from 'react';
import './landing.css';

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="overlay" />
      <div className="landing-content">
        <h1 className="landing-title">ClaimOneOff</h1>
        <p className="landing-subtitle">Votre solution SaaS pour gérer les réclamations logistiques e-commerce</p>
        <div className="landing-buttons">
          <a href="/login" className="btn">Connexion</a>
          <a href="/register" className="btn btn-secondary">Inscription</a>
        </div>
      </div>
    </div>
  );
};

export default Landing;
