// src/pages/Login.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await signInWithEmailAndPassword(auth, email, motdepasse);
      setMessage("✅ Connexion réussie !");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      console.error("Erreur : ", error);
      setMessage("❌ Erreur : " + (error.message || "Échec de connexion"));
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Connexion</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Mot de passe" value={motdepasse} onChange={(e) => setMotdepasse(e.target.value)} required />
        <button type="submit">Se connecter</button>
        {message && <p className="message">{message}</p>}
        <a href="/register" className="register-link">Créer un compte</a>
      </form>
    </div>
  );
};

export default Login;


