// src/pages/register.jsx
import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    societe: "",
    nom: "",
    prenom: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("⏳ Création du compte...");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Envoi à Google Sheets via Apps Script WebApp
      await axios.post(
        "https://script.google.com/macros/s/AKfycbzm3MrvKRQy75IMnHosYHC1zHvIIxq-kf53ZwV9J2YatrP6C90MCO7JJHjSFxOnQdle/exec",
        {
          Societe: formData.societe,
          Nom: formData.nom,
          Prenom: formData.prenom,
          Email: formData.email,
          Role: "client",
          Actif: "oui",
          Date_Inscription: new Date().toLocaleString(),
          Derniere_Connexion: "",
        }
      );

      setMessage("✅ Compte créé avec succès !");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        setMessage("❌ Cette adresse email est déjà utilisée.");
      } else {
        setMessage("❌ Erreur : " + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div className="backdrop-blur-md bg-white/10 border border-white/30 shadow-lg rounded-xl p-8 w-full max-w-md text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Créer un compte</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="societe"
            placeholder="Société"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none"
          />
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none"
          />
          <input
            type="text"
            name="prenom"
            placeholder="Prénom"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Adresse email"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 bg-white text-purple-700 font-bold rounded-lg hover:bg-gray-200 transition"
          >
            Créer le compte
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center font-semibold">{message}</p>
        )}

        <div className="text-center mt-6 text-sm">
          Vous avez déjà un compte ?{" "}
          <a href="/login" className="underline">
            Se connecter
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
