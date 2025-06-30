import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-glass">
        <h1>ClaimOneOff</h1>
        <p>Optimisez la gestion de vos litiges logistiques e-commerce</p>
        <div className="landing-buttons">
          <button onClick={() => navigate('/login')}>Se connecter</button>
          <button onClick={() => navigate('/register')}>S'inscrire</button>
        </div>
      </div>
    </div>
  );
}
