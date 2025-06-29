import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    societe: '',
    nom: '',
    prenom: '',
    email: '',
    password: '',
    role: 'client',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { societe, nom, prenom, email, password, role } = formData;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'UtilisateursClaimOneOff', user.uid), {
        ID_User: user.uid,
        Societe: societe,
        Nom: nom,
        Prenom: prenom,
        Email: email,
        MotDePasse_Hash: password, // ⚠️ à remplacer par un vrai hash sécurisé si besoin
        Role: role,
        Actif: true,
        Date_Inscription: serverTimestamp(),
        Derniere_Connexion: null,
      });

      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Inscription</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input type="text" name="societe" placeholder="Société" onChange={handleChange} className="mb-2 px-3 py-2 border rounded w-full" />
        <input type="text" name="nom" placeholder="Nom" onChange={handleChange} className="mb-2 px-3 py-2 border rounded w-full" />
        <input type="text" name="prenom" placeholder="Prénom" onChange={handleChange} className="mb-2 px-3 py-2 border rounded w-full" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="mb-2 px-3 py-2 border rounded w-full" />
        <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} className="mb-2 px-3 py-2 border rounded w-full" />
        <select name="role" onChange={handleChange} className="mb-4 px-3 py-2 border rounded w-full">
          <option value="client">Client</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          S'inscrire
        </button>
      </form>
    </div>
  );
}

