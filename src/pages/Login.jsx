// src/pages/Login.jsx
import React, { useState } from "react";
import { auth } from "../firebaseConfig";
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
    try {
      await signInWithEmailAndPassword(auth, email, motDePasse);
      navigate("/dashboard");
    } catch (error) {
      setMessage("❌ Identifiants incorrects ou erreur serveur.");
    }
  };

  return (
    <div className="login-container">
      <h1>Connexion</h1>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Mot de passe" value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)} required />
        <button type="submit">Se connecter</button>
        {message && <p className="message">{message}</p>}
      </form>
      <p>Pas encore de compte ? <a href="/register">S'inscrire</a></p>
    </div>
  );
};

export default Login;

