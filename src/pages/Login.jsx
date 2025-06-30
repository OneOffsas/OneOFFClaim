import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import './auth.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleConnexion = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, motDePasse);
      setMessage('✅ Connexion réussie !');
      navigate('/dashboard');
    } catch (error) {
      setMessage('❌ Identifiants invalides.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Connexion</h2>
        <form onSubmit={handleConnexion}>
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
        {message && <p className="message">{message}</p>}
        <p className="link-text">
          Pas encore de compte ? <a href="/register">Inscription</a>
        </p>
      </div>
    </div>
  );
}

export default Login;

