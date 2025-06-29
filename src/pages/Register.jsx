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
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const scriptURL = "https://script.google.com/macros/s/AKfycbzm3MrvKRQy75IMnHosYHC1zHvIIxq-kf53ZwV9J2YatrP6C90MCO7JJHjSFxOnQdle/exec";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateID = () => {
    return "U" + Math.floor(100000 + Math.random() * 900000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const ID_User = generateID();
    const Date_Inscription = new Date().toLocaleDateString("fr-FR");
    const Derniere_Connexion = "";
    const MotDePasse_Hash = formData.MotDePasse_Hash; // Remplacer par hash réel si sécurité plus poussée

    try {
      const response = await axios.post(scriptURL, {
        action: "registerUser",
        ID_User,
        Societe: formData.Societe,
        Nom: formData.Nom,
        Prenom: formData.Prenom,
        Email: formData.Email,
        MotDePasse_Hash,
        Role: formData.Role,
        Actif: formData.Actif,
        Date_Inscription,
        Derniere_Connexion
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
        });
      } else {
        setMessage("❌ Erreur : " + response.data.message);
      }
    } catch (error) {
      setMessage("❌ Erreur : Network Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Créer un compte</h2>

        <input
          type="text"
          name="Societe"
          placeholder="Société"
          value={formData.Societe}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Nom"
          placeholder="Nom"
          value={formData.Nom}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Prenom"
          placeholder="Prénom"
          value={formData.Prenom}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="Email"
          placeholder="Email"
          value={formData.Email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="MotDePasse_Hash"
          placeholder="Mot de passe"
          value={formData.MotDePasse_Hash}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Envoi en cours..." : "S'inscrire"}
        </button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default Register;

