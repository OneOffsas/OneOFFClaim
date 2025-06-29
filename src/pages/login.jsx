// src/pages/login.jsx

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const seConnecter = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, motDePasse);
      setMessage('Connexion réussie !');
      navigate('/dashboard');
    } catch (erreur) {
      setMessage(`Erreur : ${erreur.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-800 to-indigo-800">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Connexion</h2>
        <form onSubmit={seConnecter} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg font-semibold"
          >
            Se connecter
          </button>
          {message && (
            <div className="text-center mt-4 text-red-500">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
