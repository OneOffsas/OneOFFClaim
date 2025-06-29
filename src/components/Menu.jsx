import React from 'react';
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex space-x-4">
      <Link to="/dashboard" className="hover:underline">Dashboard</Link>
      <Link to="/register" className="hover:underline">Inscription</Link>
      <Link to="/login" className="hover:underline">Connexion</Link>
    </nav>
  );
}

