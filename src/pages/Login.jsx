import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, motDePasse);
      navigate("/dashboard");
    } catch (error) {
      setMessage("❌ Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="auth-container">
      <div className="form-box">
        <h2>Connexion</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Mot de passe" value={motDePasse} onChange={e => setMotDePasse(e.target.value)} />
        <button onClick={handleLogin}>Se connecter</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Login;

