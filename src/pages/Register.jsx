import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, motDePasse);
      setMessage("✅ Inscription réussie !");
      navigate("/dashboard");
    } catch (error) {
      setMessage("❌ Erreur : " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="form-box">
        <h2>Inscription</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Mot de passe" value={motDePasse} onChange={e => setMotDePasse(e.target.value)} />
        <button onClick={handleRegister}>Créer un compte</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Register;
