import React from 'react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="glass-card">
        <h1 className="title">ClaimOneOff</h1>
        <p className="subtitle">Optimisez la gestion de vos litiges logistiques e-commerce</p>
        <p className="description">
          Notre solution SaaS vous permet de suivre, analyser et résoudre vos litiges transport et erreurs de préparation avec une interface intuitive et des KPIs puissants.
        </p>
        <div className="btn-group">
          <button onClick={() => navigate('/register')}>Créer un compte</button>
          <button onClick={() => navigate('/login')} className="outline">Se connecter</button>
        </div>
      </div>
      <div className="background-animation"></div>
    </div>
  );
}

export default LandingPage;
