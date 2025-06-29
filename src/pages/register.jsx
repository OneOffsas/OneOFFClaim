import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    societe: "",
    prenom: "",
    nom: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Création utilisateur dans Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Enregistrement dans Google Sheets via Apps Script
      await axios.post(
        "https://script.google.com/macros/s/AKfycbzm3MrvKRQy75IMnHosYHC1zHvIIxq-kf53ZwV9J2YatrP6C90MCO7JJHjSFxOnQdle/exec",
        {
          societe: formData.societe,
          prenom: formData.prenom,
          nom: formData.nom,
          email: formData.email,
          role: "client",
          actif: "oui",
        }
      );

      setSuccess("Inscription réussie ! Redirection...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err);
      setError("❌ Erreur : " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-md rounded-xl m-4 shadow-2xl border border-white/20" />

      <div className="relative z-10 p-10 w-full max-w-lg bg-white/20 rounded-2xl shadow-xl backdrop-blur-md border border-white/30">
        <h2 className="text-3xl font-bold text-white text-center mb-6 drop-shadow">
          Créer un compte
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["societe", "prenom", "nom", "email", "password"].map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : field === "password" ? "password" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="w-full p-3 bg-white/30 rounded-md border border-white/40 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-60 transition"
              required
            />
          ))}
          <button
            type="submit"
            className="w-full py-3 bg-white text-indigo-800 font-semibold rounded-md hover:bg-opacity-80 transition"
          >
            S’inscrire
          </button>
        </form>
        {error && <p className="text-red-300 mt-4 text-sm">{error}</p>}
        {success && <p className="text-green-300 mt-4 text-sm">{success}</p>}
      </div>
    </div>
  );
};

export default Register;

