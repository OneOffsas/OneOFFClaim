import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, motDePasse);
      setMessage('✅ Connexion réussie ! Redirection...');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setMessage('❌ Email ou mot de passe incorrect.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box glass-effect">
        <h2>🔐 Connexion</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Adresse e-mail"
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
        </form>
        <p className="message">{message}</p>
        <p className="link">
          Pas encore inscrit ? <a href="/register">Créer un compte</a>
        </p>
      </div>
    </div>
  );
}

export default Login;


