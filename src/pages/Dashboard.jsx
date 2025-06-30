import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Bienvenue sur ClaimOneOff</h1>
        <button onClick={logout}>Déconnexion</button>
      </header>
      <main>
        <p>Ici s’affichera votre tableau de bord client/admin.</p>
      </main>
    </div>
  );
}

export default Dashboard;
