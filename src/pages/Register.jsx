import React, { useState } from 'react';
import axios from 'axios';
import './register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    societe: '',
    nom: '',
    prenom: '',
    email: '',
    motdepasse: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('⏳ Envoi en cours...');

    try {
      await axios.post(
        'https://script.google.com/macros/s/AKfycbzm3MrvKRQy75IMnHosYHC1zHvIIxq-kf53ZwV9J2YatrP6C90MCO7JJHjSFxOnQdle/exec',
        new URLSearchParams({
          societe: formData.societe,
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          motdepasse: formData.motdepasse,
          role: 'client',
          actif: 'true',
          date_inscription: new Date().toISOString(),
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      setMessage('✅ Inscription réussie !');
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      setMessage('❌ Erreur : Network Error');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Créer un compte</h2>
        <input name="societe" placeholder="Société" onChange={handleChange} required />
        <input name="nom" placeholder="Nom" onChange={handleChange} required />
        <input name="prenom" placeholder="Prénom" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="motdepasse" placeholder="Mot de passe" onChange={handleChange} required />
        <button type="submit">S'inscrire</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default Register;
