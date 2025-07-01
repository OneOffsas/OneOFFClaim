import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    societe: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification des champs
    if (!form.nom || !form.prenom || !form.societe || !form.email || !form.password) {
      setMessage("❌ Tous les champs sont obligatoires.");
      return;
    }

    try {
      // 🔐 Firebase Auth
      await createUserWithEmailAndPassword(auth, form.email, form.password);

      // 📄 Google Sheets via Apps Script
      await fetch("https://script.google.com/macros/s/AKfycbzm3MrvKRQy75IMnHosYHC1zHvIIxq-kf53ZwV9J2YatrP6C90MCO7JJHjSFxOnQdle/exec", {
        method: "POST",
        body: JSON.stringify({
          Email: form.email,
          Role: "client",
          Actif: "Oui",
          Date_Inscription: new Date().toLocaleDateString("fr-FR"),
          Nom: form.nom,
          Prenom: form.prenom,
          Societe: form.societe,
        }),
        headers: { "Content-Type": "application/json" },
      });

      setMessage("✅ Inscription réussie !");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage("❌ Erreur : " + error.message);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Créer un compte</h2>
        <input type="text" name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required />
        <input type="text" name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} required />
        <input type="text" name="societe" placeholder="Société" value={form.societe} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Mot de passe" value={form.password} onChange={handleChange} required />
        <button type="submit">S'inscrire</button>
        {message && <p className="register-message">{message}</p>}
        <p className="link-login" onClick={() => navigate("/login")}>Déjà un compte ? Se connecter</p>
      </form>
    </div>
  );
}

export default Register;

