import React, { useState } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Ici tu ajoutes ta logique Firebase Auth
      alert("✅ Compte créé !");
      navigate('/login');
    } catch (error) {
      alert("❌ Erreur d'inscription");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Créer un compte</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={handleRegister}>S'inscrire</button>
      </div>
    </div>
  );
};

export default Register;

