import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
  const location = useLocation();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('claimoneoff_user'));
    if (storedUser?.Role) {
      setRole(storedUser.Role);
    }
  }, []);

  const isActive = (path) => location.pathname === path ? 'text-blue-600 font-bold' : 'text-gray-700';

  return (
    <nav className="bg-white shadow p-4 flex gap-6 text-sm md:text-base">
      <Link to="/" className={isActive('/')}>Accueil</Link>
      <Link to="/tickets" className={isActive('/tickets')}>Tickets</Link>
      {role === 'admin' && (
        <Link to="/users" className={isActive('/users')}>Utilisateurs</Link>
      )}
      <Link to="/logout" className="ml-auto text-red-600">Déconnexion</Link>
    </nav>
  );
};

export default Menu;
