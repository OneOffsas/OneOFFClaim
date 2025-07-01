import React, { useState } from 'react';
import './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setMessage('❌ Tous les champs sont obligatoires.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Requête à Google Sheets pour trouver le rôle
      const response = await fetch('https://script.google.com/macros/s/AKfycbzm3MrvKRQy75IMnHosYHC1zHvIIxq-kf53ZwV9J2YatrP6C90MCO7JJHjSFxOnQdle/exec');
      const data = await response.json();

      const user = data.find(entry => entry.Email === email);

      if (user) {
        if (user.Role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/client');
        }
      } else {
        setMessage("❌ Compte introuvable dans la base.");
      }
    } catch (error) {
      console.error(error);
      setMessage(`❌ ${error.message}`);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Connexion</h2>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} />
        <button type="submit">Se connecter</button>
        <p className="message">{message}</p>
        <p className="forgot" onClick={() => navigate('/forgot-password')}>Mot de passe oublié ?</p>
      </form>
    </div>
  );
}

export default Login;

