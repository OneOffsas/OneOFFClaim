import React, { useState } from "react";
import "./register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    ID_User: Date.now().toString(),
    Societe: "",
    Nom: "",
    Prenom: "",
    Email: "",
    MotDePasse_Hash: "",
    Role: "client",
    Actif: "oui",
    Date_Inscription: new Date().toISOString(),
    Derniere_Connexion: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbzm3MrvKRQy75IMnHosYHC1zHvIIxq-kf53ZwV9J2YatrP6C90MCO7JJHjSFxOnQdle/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: "registerUser",
          data: formData
        })
      });

      const result = await response.json();

      if (result.success) {
        setMessage("✅ Inscription réussie !");
        setFormData({
          ID_User: Date.now().toString(),
          Societe: "",
          Nom: "",
          Prenom: "",
          Email: "",
          MotDePasse_Hash: "",
          Role: "client",
          Actif: "oui",
          Date_Inscription: new Date().toISOString(),
          Derniere_Connexion: ""
        });
      } else {
        setMessage("❌ Erreur : " + result.message);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      setMessage("❌ Erreur réseau ou serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Créer un compte</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input type="text" name="Societe" placeholder="Société" value={formData.Societe} onChange={handleChange} required />
        <input type="text" name="Nom" placeholder="Nom" value={formData.Nom} onChange={handleChange} required />
        <input type="text" name="Prenom" placeholder="Prénom" value={formData.Prenom} onChange={handleChange} required />
        <input type="email" name="Email" placeholder="Email" value={formData.Email} onChange={handleChange} required />
        <input type="password" name="MotDePasse_Hash" placeholder="Mot de passe" value={formData.MotDePasse_Hash} onChange={handleChange} required />
        <button type="submit" disabled={loading}>
          {loading ? "Envoi en cours..." : "S'inscrire"}
        </button>
        {message && <p className="register-message">{message}</p>}
      </form>
    </div>
  );
};

export default Register;
