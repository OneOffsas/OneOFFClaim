import React from 'react';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>ClaimOneOff</h1>
        <nav>
          <span>Bienvenue {user?.prenom || 'Utilisateur'}</span>
          <button onClick={handleLogout}>Déconnexion</button>
        </nav>
      </header>

      <main className="dashboard-main">
        <h2>Tableau de bord</h2>
        <div className="dashboard-cards">
          <div className="card">
            <h3>Tickets Ouverts</h3>
            <p>12</p>
          </div>
          <div className="card">
            <h3>Résolus ce mois</h3>
            <p>37</p>
          </div>
          <div className="card">
            <h3>Temps moyen de résolution</h3>
            <p>5h 13min</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;


