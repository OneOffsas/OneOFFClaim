import React, { useState } from 'react';
import './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [message, setMessage] = useState('');

  const handleConnexion = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, motDePasse);
      setMessage('Connexion réussie ! 🎉');
      window.location.href = '/dashboard';
    } catch (error) {
      setMessage("❌ Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleConnexion} className="login-form">
        <h2>Connexion</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Mot de passe" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} required />
        <button type="submit">Se connecter</button>
        {message && <p className="message">{message}</p>}
        <p className="redirect">Pas encore de compte ? <a href="/register">Inscription</a></p>
      </form>
    </div>
  );
};

export default Login;
