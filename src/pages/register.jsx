// src/pages/register.jsx
import React, { useState } from "react";
import { auth } from "../firebase";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [societe, setSociete] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("⏳ Création du compte en cours...");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        motDePasse
      );
      const user = userCredential.user;

      // ✅ Envoi vers Google Sheets via Apps Script
      await axios.post(
        "https://script.google.com/macros/s/AKfycbzm3MrvKRQy75IMnHosYHC1zHvIIxq-kf53ZwV9J2YatrP6C90MCO7JJHjSFxOnQdle/exec",
        {
          Email: email,
          Role: "client",
          Actif: "oui",
          Date_Inscription: new Date().toLocaleString("fr-FR"),
          Nom: nom,
          Prenom: prenom,
          Societe: societe,
        }
      );

      setMessage("✅ Compte créé avec succès !");
    } catch (error) {
      console.error("Erreur :", error);
      if (error.code === "auth/email-already-in-use") {
        setMessage("❌ Cette adresse email est déjà utilisée.");
      } else {
        setMessage("❌ Erreur : " + error.message);
      }
    }
  };

  return (
    <div className="register-page">
      <h1>Créer un compte</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Société"
          value={societe}
          onChange={(e) => setSociete(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          required
        />
        <button type="submit">S'inscrire</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

