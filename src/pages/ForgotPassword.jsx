import React, { useState } from 'react';
import './ForgotPassword.css';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setStatus('Envoi en cours...');

    try {
      await sendPasswordResetEmail(auth, email);
      setStatus('✅ Email envoyé avec succès !');
    } catch (error) {
      console.error(error.message);
      setStatus("❌ Erreur : " + error.message);
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2>🔒 Mot de passe oublié</h2>
        <form onSubmit={handleReset}>
          <input
            type="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Réinitialiser le mot de passe</button>
          <p className="status-message">{status}</p>
        </form>
        <button className="back-btn" onClick={() => navigate('/')}>⬅ Retour à l'accueil</button>
      </div>
    </div>
  );
}

export default ForgotPassword;
