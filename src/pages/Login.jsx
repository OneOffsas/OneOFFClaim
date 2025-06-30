import React, { useState } from 'react';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('Connexion en cours...');

    try {
      // Ajoute ici l’appel à Firebase Auth
      setMessage('✅ Connexion réussie');
    } catch (error) {
      setMessage('❌ Connexion échouée');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Connexion</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={motDePasse}
          required
          onChange={(e) => setMotDePasse(e.target.value)}
        />
        <button type="submit">Se connecter</button>
        <p className="login-message">{message}</p>
      </form>
    </div>
  );
};

export default Login;

