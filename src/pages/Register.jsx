import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./Register.css";

const Register = () => {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    societe: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nom, prenom, societe, email, password } = form;

    if (!nom || !prenom || !societe || !email || !password) {
      setMessage("❌ Tous les champs sont obligatoires.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // Ajout dans Google Sheets
      await fetch("https://script.google.com/macros/s/TON_URL_PUBLIC/exec", {
        method: "POST",
        body: JSON.stringify({
          Email: email,
          Nom: nom,
          Prenom: prenom,
          Societe: societe,
          Role: "Client",
          Actif: "Oui",
          Date_Inscription: new Date().toLocaleString("fr-FR"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMessage("✅ Inscription réussie !");
      setForm({ nom: "", prenom: "", societe: "", email: "", password: "" });
    } catch (error) {
      setMessage(`❌ Erreur : ${error.message}`);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Inscription</h2>
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={form.nom}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          value={form.prenom}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="societe"
          placeholder="Société"
          value={form.societe}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Créer un compte</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default Register;


