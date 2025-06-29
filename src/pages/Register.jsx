import React, { useState } from "react";
import axios from "axios";
import "./register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    Societe: "",
    Nom: "",
    Prenom: "",
    Email: "",
    MotDePasse_Hash: "",
    Role: "client",
    Actif: "oui",
    Date_Inscription: new Date().toISOString().split("T")[0],
    Derniere_Connexion: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("⏳ Envoi en cours...");

    try {
      const scriptURL = "https://script.google.com/macros/s/AKfycbzm3MrvKRQy75IMnHosYHC1zHvIIxq-kf53ZwV9J2YatrP6C90MCO7JJHjSFxOnQdle/exec";

      const response = await axios.post(scriptURL, {
        action: "registerUser",
        ...formData,
      });

      if (response.data.success) {
        setMessage("✅ Inscription réussie !");
        setFormData({
          Societe: "",
          Nom: "",
          Prenom: "",
          Email: "",
          MotDePasse_Hash: "",
          Role: "client",
          Actif: "oui",
          Date_Inscription: new Date().toISOString().split("T")[0],
          Derniere_Connexion: "",
        });
      } else {
        setMessage("❌ Erreur : " + response.data.message);
      }
    } catch (error) {
      console.error("Erreur :", error);
      setMessage("❌ Erreur : Erreur réseau ou serveur.");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Créer un compte</h2>

        <input type="text" name="Societe" placeholder="Société" value={formData.Societe} onChange={handleChange} required />
        <input type="text" name="Nom" placeholder="Nom" value={formData.Nom} onChange={handleChange} required />
        <input type="text" name="Prenom" placeholder="Prénom" value={formData.Prenom} onChange={handleChange} required />
        <input type="email" name="Email" placeholder="Email" value={formData.Email} onChange={handleChange} required />
        <input type="password" name="MotDePasse_Hash" placeholder="Mot de passe" value={formData.MotDePasse_Hash} onChange={handleChange} required />

        <button type="submit">S'inscrire</button>
        <p className="register-message">{message}</p>
      </form>
    </div>
  );
};

export default Register;
