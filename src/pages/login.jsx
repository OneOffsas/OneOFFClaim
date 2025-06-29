import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import './login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConnexion = async (e) => {
    e.preventDefault();
    setErreur('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, motDePasse);
      navigate('/dashboard'); // redirection vers dashboard
    } catch (error) {
      setErreur("❌ Identifiants incorrects ou problème de connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleConnexion} className="login-box">
        <h2>Connexion</h2>
        {erreur && <div className="error-message">{erreur}</div>}
        <input
          type="email"
          placeholder="Adresse email"
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
        <button type="submit" disabled={loading}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
        <p className="redirect-link">
          Pas encore de compte ? <span onClick={() => navigate('/register')}>S’inscrire</span>
        </p>
      </form>
    </div>
  );
}

export default Login;

