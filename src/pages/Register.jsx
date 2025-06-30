import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import './register.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setErrorMsg('❌ Les mots de passe ne correspondent pas.');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMsg('✅ Inscription réussie. Redirection...');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      setErrorMsg('❌ Une erreur est survenue.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Inscription</h2>
      <form onSubmit={handleRegister}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} required />
        <input type="password" placeholder="Confirmer mot de passe" onChange={(e) => setConfirm(e.target.value)} required />
        <button type="submit">S'inscrire</button>
        {errorMsg && <p className="error">{errorMsg}</p>}
        {successMsg && <p className="success">{successMsg}</p>}
      </form>
    </div>
  );
}

