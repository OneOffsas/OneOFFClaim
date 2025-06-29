import React, { useState } from 'react';
import './register.css';
import axios from 'axios';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.motdepasse);

      await axios.post('https://script.google.com/macros/s/AKfycbzm3MrvKRQy75IMnHosYHC1zHvIIxq-kf53ZwV9J2YatrP6C90MCO7JJHjSFxOnQdle/exec', {
        ...formData,
        role: 'client',
        actif: true,
        date_inscription: new Date().toISOString(),
      });

      setMessage('✅ Inscription réussie ! Redirection en cours...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error(error);
      setMessage('❌ Erreur : ' + (error.message || 'Erreur réseau ou serveur.'));
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2>Créer un compte</h2>
        <input type="text" name="societe" placeholder="Société" onChange={handleChange} required />
        <input type="text" name="nom" placeholder="Nom" onChange={handleChange} required />
        <input type="text" name="prenom" placeholder="Prénom" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="motdepasse" placeholder="Mot de passe" onChange={handleChange} required />
        <button type="submit">S'inscrire</button>
        {message && <p className="register-message">{message}</p>}
      </form>
    </div>
  );
};

export default Register;
