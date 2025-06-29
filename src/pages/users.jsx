// src/pages/users.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';

const UsersPage = () => {
  const [userRole, setUserRole] = useState(null);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    Societe: '', Nom: '', Prenom: '', Email: '', Role: 'client'
  });
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const res = await fetch(
          `https://script.google.com/macros/s/AKfycbzm3MrvKRQy75IMnHosYHC1zHvIIxq-kf53ZwV9J2YatrP6C90MCO7JJHjSFxOnQdle/exec?email=${user.email}`
        );
        const data = await res.json();
        if (data?.Role === 'admin') {
          setUserRole('admin');
          loadUsers();
        } else {
          navigate('/');
        }
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  const loadUsers = async () => {
    const usersCol = collection(db, 'UtilisateursClaimOneOff');
    const snapshot = await getDocs(usersCol);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(data);
  };

  const handleChange = (id, field, value) => {
    setUsers(users.map(user => (user.id === id ? { ...user, [field]: value } : user)));
  };

  const saveUser = async (id, user) => {
    await updateDoc(doc(db, 'UtilisateursClaimOneOff', id), user);
    alert('Utilisateur mis à jour');
  };

  const createUser = async () => {
    if (!newUser.Email) return alert('Email requis');
    const created = {
      ...newUser,
      Actif: 'oui',
      Date_Inscription: new Date().toISOString(),
      Derniere_Connexion: ''
    };
    await addDoc(collection(db, 'UtilisateursClaimOneOff'), created);

    // Google Sheets
    await fetch(
      `https://script.google.com/macros/s/AKfycbzm3MrvKRQy75IMnHosYHC1zHvIIxq-kf53ZwV9J2YatrP6C90MCO7JJHjSFxOnQdle/exec`,
      {
        method: 'POST',
        body: JSON.stringify({ action: 'add_user', ...created }),
        headers: { 'Content-Type': 'application/json' }
      }
    );

    alert('Utilisateur ajouté');
    setNewUser({ Societe: '', Nom: '', Prenom: '', Email: '', Role: 'client' });
    loadUsers();
  };

  if (userRole !== 'admin') return null;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestion des utilisateurs</h1>

      <div className="mb-6 border p-4 rounded bg-gray-50">
        <h2 className="font-semibold mb-2">Ajouter un utilisateur</h2>
        <div className="grid grid-cols-2 gap-2">
          {['Societe', 'Nom', 'Prenom', 'Email'].map(field => (
            <input key={field} type="text" placeholder={field}
              className="border p-2" value={newUser[field]}
              onChange={(e) => setNewUser({ ...newUser, [field]: e.target.value })}
            />
          ))}
          <select className="border p-2" value={newUser.Role}
            onChange={(e) => setNewUser({ ...newUser, Role: e.target.value })}>
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={createUser} className="bg-blue-600 text-white px-4 py-2 rounded">Créer</button>
        </div>
      </div>

      {users.map(user => (
        <div key={user.id} className="border-b py-2 grid grid-cols-6 gap-2 items-center">
          <input type="text" value={user.Nom} className="border p-1"
            onChange={(e) => handleChange(user.id, 'Nom', e.target.value)} />
          <input type="text" value={user.Prenom} className="border p-1"
            onChange={(e) => handleChange(user.id, 'Prenom', e.target.value)} />
          <input type="text" value={user.Email} className="border p-1"
            onChange={(e) => handleChange(user.id, 'Email', e.target.value)} />
          <input type="text" value={user.Societe} className="border p-1"
            onChange={(e) => handleChange(user.id, 'Societe', e.target.value)} />
          <select value={user.Role} className="border p-1"
            onChange={(e) => handleChange(user.id, 'Role', e.target.value)}>
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={() => saveUser(user.id, user)} className="bg-green-500 text-white px-2 py-1 rounded">💾</button>
        </div>
      ))}
    </div>
  );
};

export default UsersPage;
