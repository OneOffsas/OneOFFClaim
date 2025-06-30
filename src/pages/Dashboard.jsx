import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/login');
    });
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Bienvenue sur ClaimOneOff</h1>
        <button onClick={handleLogout}>🔓 Déconnexion</button>
      </header>
      <main>
        <p>🎯 Ici apparaîtront vos tickets, stats, actions logistiques, IA et plus encore…</p>
      </main>
    </div>
  );
}

export default Dashboard;

