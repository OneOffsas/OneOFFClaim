import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Identifiants incorrects.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-glass">
        <h2>Connexion</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Se connecter</button>
        </form>
        <div className="login-links">
          <Link to="/register">Créer un compte</Link>
          <Link to="/forgot-password">Mot de passe oublié ?</Link>
        </div>
      </div>
    </div>
  );
}

