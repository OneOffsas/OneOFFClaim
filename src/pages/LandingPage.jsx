import React from 'react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="overlay">
        <h1 className="landing-title">ClaimOneOff</h1>
        <p className="landing-subtitle">Optimisez la gestion de vos litiges logistiques e-commerce.</p>
        <div className="landing-buttons">
          <button onClick={() => navigate('/login')}>Se connecter</button>
          <button onClick={() => navigate('/register')}>S’inscrire</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
