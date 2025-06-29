import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import './register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    societe: '',
    nom: '',
    prenom: '',
    email: '',
    motdepasse: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      // 🔐 Création dans Firebase
      await createUserWithEmailAndPassword(auth, formData.email, formData.motdepasse);

      // 📄 Envoi vers Google Sheets
      await fetch('https://script.google.com/macros/s/AKfycbzm3MrvKRQy75IMnHosYHC1zHvIIxq-kf53ZwV9J2YatrP6C90MCO7JJHjSFxOnQdle/exec', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          role: 'client',
          actif: 'oui',
          date_inscription: new Date().toISOString(),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setMessage('✅ Inscription réussie !');
      setFormData({ societe: '', nom: '', prenom: '', email: '', motdepasse: '' });
    } catch (error) {
      console.error(error);
      setMessage(`❌ Erreur : ${error.message.includes('email-already-in-use') ? "Email déjà utilisé." : "Erreur réseau ou serveur."}`);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Créer un compte</h2>
        <input name="societe" value={formData.societe} onChange={handleChange} placeholder="Société" required />
        <input name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" required />
        <input name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="motdepasse" value={formData.motdepasse} onChange={handleChange} placeholder="Mot de passe" required />
        <button type="submit">S’inscrire</button>
        {message && <p className="register-message">{message}</p>}
      </form>
    </div>
  );
};

export default Register;
