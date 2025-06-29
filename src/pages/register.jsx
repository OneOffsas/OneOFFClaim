// src/pages/register.jsx
import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    societe: "",
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
  });
  const [erreur, setErreur] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.motDePasse
      );

      // Enregistrement dans Firestore
      await setDoc(doc(db, "UtilisateursClaimOneOff", user.uid), {
        ID_User: user.uid,
        Societe: formData.societe,
        Nom: formData.nom,
        Prenom: formData.prenom,
        Email: formData.email,
        Role: "client",
        Actif: true,
        Date_Inscription: new Date().toISOString(),
        Derniere_Connexion: "",
      });

      console.log("✅ Utilisateur créé avec succès dans Firestore");

      // Redirection vers le login
      navigate("/login");

    } catch (err) {
      console.error("❌ Erreur à l'inscription :", err);
      if (err.code === "auth/email-already-in-use") {
        setErreur("Cette adresse email est déjà utilisée.");
      } else if (err.code === "auth/weak-password") {
        setErreur("Le mot de passe est trop faible (min. 6 caractères).");
      } else if (err.code === "auth/invalid-email") {
        setErreur("Adresse email invalide.");
      } else {
        setErreur("Erreur réseau ou inconnue. Réessaye plus tard.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-800 to-indigo-800 text-white">
      <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-2xl text-gray-800">
        <h1 className="text-2xl font-bold mb-4 text-center">Créer un compte</h1>
        {erreur && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{erreur}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="societe" onChange={handleChange} type="text" placeholder="Société" className="w-full p-3 border rounded" required />
          <input name="nom" onChange={handleChange} type="text" placeholder="Nom" className="w-full p-3 border rounded" required />
          <input name="prenom" onChange={handleChange} type="text" placeholder="Prénom" className="w-full p-3 border rounded" required />
          <input name="email" onChange={handleChange} type="email" placeholder="Email" className="w-full p-3 border rounded" required />
          <input name="motDePasse" onChange={handleChange} type="password" placeholder="Mot de passe" className="w-full p-3 border rounded" required />
          <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 transition">S’inscrire</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
