import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    societe: "",
    prenom: "",
    nom: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Étape 1 : Crée l'utilisateur dans Firebase
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      // Étape 2 : Enregistre aussi dans Google Sheets via Apps Script
      await axios.post("https://script.google.com/macros/s/AKfycbzm3MrvKRQy75IMnHosYHC1zHvIIxq-kf53ZwV9J2YatrP6C90MCO7JJHjSFxOnQdle/exec", {
        Societe: formData.societe,
        Prenom: formData.prenom,
        Nom: formData.nom,
        Email: formData.email,
        Role: "client",
        Actif: "oui",
        Date_Inscription: new Date().toISOString(),
        Derniere_Connexion: "",
      });

      setMessage("✅ Inscription réussie !");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      if (error.message.includes("email-already-in-use")) {
        setMessage("❌ Cette adresse email est déjà utilisée.");
      } else if (error.message.includes("Network Error")) {
        setMessage("❌ Erreur réseau. Vérifie ta connexion.");
      } else {
        setMessage(`❌ Erreur : ${error.message}`);
      }
    }
  };

  return (
    <div className="register-page">
      <div className="glass-card">
        <h2>Créer un compte</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="societe" placeholder="Société" onChange={handleChange} required />
          <input type="text" name="prenom" placeholder="Prénom" onChange={handleChange} required />
          <input type="text" name="nom" placeholder="Nom" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} required />
          <button type="submit">S'inscrire</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
