import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function Register() {
  const [formData, setFormData] = useState({
    societe: '',
    nom: '',
    prenom: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { societe, nom, prenom, email, password } = formData;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const id = uuidv4();
      const date = new Date().toISOString();

      // Appel à l’API pour enregistrer l'utilisateur dans Google Sheets
      await fetch('https://script.google.com/macros/s/TON_SCRIPT_DEPLOYE/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ID_User: id,
          Societe: societe,
          Nom: nom,
          Prenom: prenom,
          Email: email,
          MotDePasse_Hash: password, // optionnel, à hasher côté serveur idéalement
          Role: "client",
          Actif: "oui",
          Date_Inscription: date,
          Derniere_Connexion: date,
        })
      });

      navigate('/login');
    } catch (err) {
      setError("Erreur d'inscription : " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form onSubmit={handleRegister} className="bg-white shadow-md rounded p

