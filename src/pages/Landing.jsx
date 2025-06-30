import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="glass-box">
        <h1 className="main-title">ClaimOneOff</h1>
        <p className="subtitle">Révolutionnez la gestion de vos litiges logistiques e-commerce.</p>
        <p className="description">
          Notre solution vous permet d'automatiser, suivre et résoudre efficacement vos réclamations transporteurs,
          tout en vous offrant une interface intuitive et des statistiques puissantes.
        </p>
        <div className="button-group">
          <button onClick={() => navigate('/register')} className="btn">S'inscrire</button>
          <button onClick={() => navigate('/login')} className="btn btn-secondary">Se connecter</button>
          <button onClick={() => navigate('/forgot-password')} className="btn btn-link">Mot de passe oublié</button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
