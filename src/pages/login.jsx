// src/pages/login.jsx
import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("⏳ Connexion...");

    try {
      await signInWithEmailAndPassword(auth, email, motDePasse);
      setMessage("✅ Connexion réussie !");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setMessage("❌ Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Connexion</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit">Se connecter</button>
        </form>
        {message && <p className="login-message">{message}</p>}
        <p className="login-footer">
          Pas encore de compte ?{" "}
          <a href="/register">Créer un compte</a>
        </p>
      </div>
    </div>
  );
};

export default Login;


