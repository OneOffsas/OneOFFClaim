import React, { useState } from 'react';
import './register.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function Register() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (motDePasse !== confirmation) {
      setMessage('❌ Les mots de passe ne correspondent pas.');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, motDePasse);
      setMessage('✅ Inscription réussie !');
    } catch (error) {
      console.error(error);
      setMessage('❌ Erreur : ' + error.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleRegister}>
        <h2>Inscription</h2>
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
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          required
        />
        <button type="submit">Créer un compte</button>
        <p className="message">{message}</p>
        <p className="link">Déjà inscrit ? <a href="/login">Se connecter</a></p>
      </form>
    </div>
  );
}

export default Register;

