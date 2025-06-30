import React, { useState } from 'react';
import './Register.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Register = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [message, setMessage] = useState('');

  const handleInscription = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, motDePasse);
      setMessage('✅ Inscription réussie !');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    } catch (error) {
      setMessage("❌ Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleInscription} className="register-form">
        <h2>Créer un compte</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Mot de passe" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} required />
        <button type="submit">S'inscrire</button>
        {message && <p className="message">{message}</p>}
        <p className="redirect">Déjà inscrit ? <a href="/login">Connexion</a></p>
      </form>
    </div>
  );
};

export default Register;

