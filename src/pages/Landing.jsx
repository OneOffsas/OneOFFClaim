import React from 'react';
import './landing.css';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <header className="landing-header">
        <h1>ClaimOneOff</h1>
        <nav>
          <button onClick={() => navigate('/login')}>Connexion</button>
          <button onClick={() => navigate('/register')}>Inscription</button>
        </nav>
      </header>

      <section className="landing-hero">
        <h2>La solution SaaS ultime pour gérer vos litiges logistiques</h2>
        <p>Centralisez les réclamations, suivez les performances, automatisez vos process, et offrez une expérience client exceptionnelle.</p>
        <button onClick={() => navigate('/register')}>Commencer maintenant</button>
      </section>
    </div>
  );
}

export default Landing;
