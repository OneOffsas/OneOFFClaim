import React, { useState } from 'react';
import './Register.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Register = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    societe: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nom, prenom, societe, email, password } = formData;

    if (!nom || !prenom || !societe || !email || !password) {
      setMessage('❌ Tous les champs sont obligatoires.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await fetch('https://script.google.com/macros/s/AKfycbzm3MrvKRQy75IMnHosYHC1zHvIIxq-kf53ZwV9J2YatrP6C90MCO7JJHjSFxOnQdle/exec', {
        method: 'POST',
        body: JSON.stringify({
          Nom: nom,
          Prenom: prenom,
          Societe: societe,
          Email: email,
          Role: 'Client',
          Actif: 'Oui',
          Date_Inscription: new Date().toLocaleDateString('fr-FR'),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setMessage('✅ Inscription réussie !');
    } catch (error) {
      setMessage(`❌ Erreur : ${error.message}`);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Créer un compte</h2>
        <input type="text" name="nom" placeholder="Nom" onChange={handleChange} />
        <input type="text" name="prenom" placeholder="Prénom" onChange={handleChange} />
        <input type="text" name="societe" placeholder="Société" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} />
        <button type="submit">S'inscrire</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default Register;


