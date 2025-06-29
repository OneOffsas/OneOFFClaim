import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css';

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="overlay" />
      <div className="content">
        <h1 className="title">ClaimOneOff</h1>
        <p className="subtitle">La solution ultime pour la gestion des litiges e-commerce</p>
        <div className="buttons">
          <Link to="/login" className="btn-primary">Se connecter</Link>
          <Link to="/register" className="btn-secondary">Créer un compte</Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;

