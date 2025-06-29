import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Assure-toi que ce fichier est bien configuré
import "./register.css";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("⏳ Création du compte...");

    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      setMessage("✅ Inscription réussie !");
    } catch (error) {
      setMessage(`❌ Erreur : ${error.message}`);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Créer un compte</h2>
        <input
          type="email"
          name="email"
          placeholder="Adresse email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">S'inscrire</button>
        {message && <p className="register-message">{message}</p>}
      </form>
    </div>
  );
}

export default Register;
