import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="glass-card">
        <h1>ClaimOneOff</h1>
        <p>Optimisez la gestion de vos litiges logistiques e-commerce</p>
        <div className="buttons">
          <button onClick={() => navigate('/login')}>Se connecter</button>
          <button onClick={() => navigate('/register')}>S'inscrire</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
