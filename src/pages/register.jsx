import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import "./register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    societe: "",
    nom: "",
    prenom: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await axios.post("https://script.google.com/macros/s/AKfycbzm3MrvKRQy75IMnHosYHC1zHvIIxq-kf53ZwV9J2YatrP6C90MCO7JJHjSFxOnQdle/exec", {
        ...formData,
        id: user.uid,
        role: "client",
        actif: "oui",
        dateInscription: new Date().toLocaleDateString("fr-FR"),
      });

      setMessage("✅ Inscription réussie !");
      setFormData({
        societe: "",
        nom: "",
        prenom: "",
        email: "",
        password: "",
      });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setMessage("❌ Email déjà utilisé.");
      } else {
        setMessage("❌ Erreur réseau. Vérifie ta connexion.");
      }
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Créer un compte</h2>
        <input type="text" name="societe" placeholder="Société" required onChange={handleChange} value={formData.societe} />
        <input type="text" name="nom" placeholder="Nom" required onChange={handleChange} value={formData.nom} />
        <input type="text" name="prenom" placeholder="Prénom" required onChange={handleChange} value={formData.prenom} />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} value={formData.email} />
        <input type="password" name="password" placeholder="Mot de passe" required onChange={handleChange} value={formData.password} />
        <button type="submit">S'inscrire</button>
        {message && <p className="register-message">{message}</p>}
      </form>
    </div>
  );
};

export default Register;
