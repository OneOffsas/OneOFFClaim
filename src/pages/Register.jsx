import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    societe: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { nom, prenom, societe, email, password } = formData;

    if (!nom || !prenom || !societe || !email || !password) {
      setMessage('❌ Tous les champs sont obligatoires.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbzm3MrvKRQy75IMnHosYHC1zHvIIxq-kf53ZwV9J2YatrP6C90MCO7JJHjSFxOnQdle/exec',
        {
          method: 'POST',
          body: JSON.stringify({
            Nom: nom,
            Prenom: prenom,
            Societe: societe,
            Email: email,
            Role: 'client',
            Actif: 'oui',
            Date_Inscription: new Date().toLocaleDateString()
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        setMessage('✅ Inscription réussie !');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage("❌ Une erreur est survenue lors de l'ajout dans Google Sheets.");
      }
    } catch (error) {
      console.error(error);
      setMessage(`❌ ${error.message}`);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2>Inscription</h2>
        <input type="text" name="nom" placeholder="Nom" onChange={handleChange} />
        <input type="text" name="prenom" placeholder="Prénom" onChange={handleChange} />
        <input type="text" name="societe" placeholder="Société" onChange={handleChange} />
        <input type="email" name="email" placeholder="Adresse email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} />
        <button type="submit">S'inscrire</button>
        <p className="message">{message}</p>
      </form>
    </div>
  );
}

export default Register;
