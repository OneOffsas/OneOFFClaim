import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import './Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmation) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError("❌ Erreur : " + err.message);
    }
  };

  return (
    <div className="auth-container register">
      <form className="auth-form" onSubmit={handleRegister}>
        <h2>Créer un compte</h2>
        {error && <div className="error">{error}</div>}
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} required />
        <input type="password" placeholder="Confirmer le mot de passe" onChange={(e) => setConfirmation(e.target.value)} required />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default Register;

