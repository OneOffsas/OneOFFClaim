import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css'; // Crée ce fichier si tu veux personnaliser encore plus

const Landing = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to right, #667eea, #764ba2)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>
        Bienvenue sur <span style={{ color: '#ffda79' }}>ClaimOneOff</span>
      </h1>
      <p style={{ fontSize: '1.5rem', maxWidth: '700px' }}>
        La plateforme SaaS tout-en-un dédiée aux e-commerçants pour gérer vos litiges logistiques, vos urgences transport, vos statistiques et vos clients.
      </p>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/login">
          <button style={buttonStyle}>Se connecter</button>
        </Link>
        <Link to="/register">
          <button style={{ ...buttonStyle, backgroundColor: '#ffda79', color: '#333', marginLeft: '1rem' }}>
            S'inscrire
          </button>
        </Link>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: '1rem 2rem',
  fontSize: '1.1rem',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
  color: '#333',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
};

export default Landing;
