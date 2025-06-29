// src/pages/Register.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import "../styles/register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    societe: "",
    email: "",
    motdepasse: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const { email, motdepasse } = formData;

      const userCredential = await createUserWithEmailAndPassword(auth, email, motdepasse);

      // ✅ Envoi dans Google Sheets via Apps Script
      await axios.post(
        "https://script.google.com/macros/s/AKfycbzm3MrvKRQy75IMnHosYHC1zHvIIxq-kf53ZwV9J2YatrP6C90MCO7JJHjSFxOnQdle/exec",
        {
          ...formData,
          role: "client",
          actif: "oui",
          date_inscription: new Date().toLocaleDateString(),
          derniere_connexion: "",
        }
      );

      setMessage("✅ Inscription réussie !");
      setFormData({
        nom: "",
        prenom: "",
        societe: "",
        email: "",
        motdepasse: "",
      });
    } catch (error) {
      console.error("Erreur : ", error);
      setMessage("❌ Erreur : " + (error.message || "Erreur réseau ou serveur"));
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Créer un compte</h2>
        <input type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} required />
        <input type="text" name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} required />
        <input type="text" name="societe" placeholder="Société" value={formData.societe} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="motdepasse" placeholder="Mot de passe" value={formData.motdepasse} onChange={handleChange} required />
        <button type="submit">S'inscrire</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default Register;
