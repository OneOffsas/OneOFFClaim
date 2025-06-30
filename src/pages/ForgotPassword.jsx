// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import './ForgotPassword.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('📬 Un email de réinitialisation a été envoyé.');
    } catch (err) {
      setMessage('❌ Erreur : ' + err.message);
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2>Mot de passe oublié ?</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleReset}>
          <input
            type="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Envoyer</button>
        </form>
        <p><span onClick={() => navigate('/login')}>⬅ Retour à la connexion</span></p>
      </div>
    </div>
  );
};

export default ForgotPassword;
