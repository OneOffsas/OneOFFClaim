import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="title">ClaimOneOff</h1>
        <p className="subtitle">
          Plateforme de gestion des litiges logistiques e-commerce.
        </p>
        <div className="buttons">
          <button onClick={() => navigate('/login')} className="btn login">Se connecter</button>
          <button onClick={() => navigate('/register')} className="btn register">S’inscrire</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
