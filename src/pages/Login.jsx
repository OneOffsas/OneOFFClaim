import React, { useState } from 'react';
import './login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, motDePasse);
      setMessage('✅ Connexion réussie !');
      onLoginSuccess();
    } catch (error) {
      console.error(error);
      setMessage('❌ Email ou mot de passe incorrect.');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Connexion</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
        <p className="message">{message}</p>
        <p className="link">Pas encore inscrit ? <a href="/register">Créer un compte</a></p>
      </form>
    </div>
  );
}

export default Login;

