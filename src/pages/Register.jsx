import React, { useState } from 'react';
import './register.css';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    Societe: '',
    Nom: '',
    Prenom: '',
    Email: '',
    MotDePasse: '',
    Role: 'client',
    Actif: 'oui',
    Date_Inscription: new Date().toLocaleDateString('fr-FR'),
    Derniere_Connexion: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('⏳ Enregistrement en cours...');

    try {
      const response = await axios.post('https://script.google.com/macros/s/AKfycbzm3MrvKRQy75IMnHosYHC1zHvIIxq-kf53ZwV9J2YatrP6C90MCO7JJHjSFxOnQdle/exec', null, {
        params: {
          action: 'registerUser',
          Societe: formData.Societe,
          Nom: formData.Nom,
          Prenom: formData.Prenom,
          Email: formData.Email,
          MotDePasse: formData.MotDePasse,
          Role: formData.Role,
          Actif: formData.Actif,
          Date_Inscription: formData.Date_Inscription,
          Derniere_Connexion: '',
        },
      });

      if (response.data.result === 'success') {
        setMessage('✅ Inscription réussie');
        setFormData({
          Societe: '',
          Nom: '',
          Prenom: '',
          Email: '',
          MotDePasse: '',
          Role: 'client',
          Actif: 'oui',
          Date_Inscription: new Date().toLocaleDateString('fr-FR'),
          Derniere_Connexion: '',
        });
      } else {
        setMessage('❌ Erreur : ' + response.data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Erreur réseau. Vérifie ta connexion ou ton script Google.');
    }
  };

  return (
    <div className="register-container">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input name="Societe" placeholder="Société" value={formData.Societe} onChange={handleChange} required />
        <input name="Nom" placeholder="Nom" value={formData.Nom} onChange={handleChange} required />
        <input name="Prenom" placeholder="Prénom" value={formData.Prenom} onChange={handleChange} required />
        <input type="email" name="Email" placeholder="Email" value={formData.Email} onChange={handleChange} required />
        <input type="password" name="MotDePasse" placeholder="Mot de passe" value={formData.MotDePasse} onChange={handleChange} required />
        <button type="submit">S'inscrire</button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
}

export default Register;
