// src/pages/home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">ClaimOneOff</h1>
      <p className="mb-8 text-center text-lg max-w-xl">
        Bienvenue sur votre plateforme dédiée à la gestion des litiges logistiques e-commerce.
        Gérez vos réclamations transporteurs, suivez vos SLA, analysez vos statistiques, le tout avec une UX de qualité.
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        <Link to="/login">
          <button className="px-6 py-3 bg-white text-indigo-800 font-semibold rounded-xl shadow-md hover:bg-gray-200 transition duration-300">
            Se connecter
          </button>
        </Link>
        <Link to="/register">
          <button className="px-6 py-3 bg-indigo-500 font-semibold rounded-xl shadow-md hover:bg-indigo-600 transition duration-300">
            Créer un compte
          </button>
        </Link>
      </div>
    </div>
  );
}
