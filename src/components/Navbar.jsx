// src/components/Navbar.jsx

import React from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {
  const isAuthenticated = !!localStorage.getItem("authUser");

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem("authUser");
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Erreur lors de la déconnexion :", error);
      });
  };

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-purple-700 text-white px-6 py-4 shadow">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-xl font-bold tracking-wide">ClaimOneOff</h1>
        <div className="space-x-6 text-sm font-medium">
          <Link to="/" className="hover:underline">
            Accueil
          </Link>
          {!isAuthenticated && (
            <>
              <Link to="/register" className="hover:underline">
                S'inscrire
              </Link>
              <Link to="/login" className="hover:underline">
                Connexion
              </Link>
            </>
          )}
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="hover:underline">
                Déconnexion
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
