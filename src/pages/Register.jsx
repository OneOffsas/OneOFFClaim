import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import './auth.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleInscription = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, motDePasse);
      setMessage('✅ Inscription réussie !');
      navigate('/dashboard');
    } catch (error) {
      setMessage("❌ Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Inscription</h2>
        <form onSubmit={handleInscription}>
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
          <button type="submit">S'inscrire</button>
        </form>
        {message && <p className="message">{message}</p>}
        <p className="link-text">
          Déjà inscrit ? <a href="/login">Connexion</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
