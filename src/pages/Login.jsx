// src/pages/Login.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, motDePasse);
      setMessage("✅ Connexion réussie !");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      setMessage("❌ Erreur : " + error.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Se connecter</h2>
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
        <button type="submit">Connexion</button>
        <p className="message">{message}</p>
        <p className="link" onClick={() => navigate("/forgot-password")}>Mot de passe oublié ?</p>
        <p className="back" onClick={() => navigate("/")}>← Retour</p>
      </form>
    </div>
  );
}

export default Login;

