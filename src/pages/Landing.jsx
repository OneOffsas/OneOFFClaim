import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="glass-card">
        <h1>ClaimOneOff</h1>
        <p>Optimisez la gestion de vos litiges logistiques e-commerce.<br />Gagnez du temps, automatisez les réclamations, analysez vos erreurs et améliorez votre satisfaction client.</p>
        <div className="landing-buttons">
          <button onClick={() => navigate('/register')}>S’inscrire</button>
          <button onClick={() => navigate('/login')}>Se connecter</button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
