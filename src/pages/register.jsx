import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [motdepasse, setMotdepasse] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [societe, setSociete] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("Création du compte en cours...");

    try {
      // Création du compte Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, motdepasse);
      const user = userCredential.user;

      // Appel Google Apps Script pour ajouter l’utilisateur à Google Sheets
      const response = await axios.post('https://script.google.com/macros/s/AKfycbzm3MrvKRQy75IMnHosYHC1zHvIIxq-kf53ZwV9J2YatrP6C90MCO7JJHjSFxOnQdle/exec', {
        action: "register_user",
        email: email,
        motdepasse: motdepasse,
        nom: nom,
        prenom: prenom,
        societe: societe,
      });

      if (response.data.status === "success") {
        setMessage("Compte créé avec succès !");
        navigate("/dashboard");
      } else {
        setMessage("Erreur côté Google Sheets : " + response.data.message);
      }

    } catch (error) {
      console.error("Erreur d'inscription :", error);
      setMessage("Erreur : " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-violet-600 to-indigo-700 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Créer un compte</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Société"
            value={societe}
            onChange={(e) => setSociete(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl"
            required
          />
          <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl"
            required
          />
          <input
            type="text"
            placeholder="Prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl"
            required
          />
          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={motdepasse}
            onChange={(e) => setMotdepasse(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl"
            required
          />
          <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition">S’inscrire</button>
        </form>
        {message && <p className="mt-4 text-sm text-center text-red-600">{message}</p>}
      </div>
    </div>
  );
}

export default Register;

