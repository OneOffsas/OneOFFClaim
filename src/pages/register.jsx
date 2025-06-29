import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import './register.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [societe, setSociete] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      // Création utilisateur Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, motDePasse);

      // Enregistrement dans Google Sheets via App Script
      await axios.post('https://script.google.com/macros/s/AKfycbzm3MrvKRQy75IMnHosYHC1zHvIIxq-kf53ZwV9J2YatrP6C90MCO7JJHjSFxOnQdle/exec', {
        sheet: 'UtilisateursClaimOneOff',
        data: {
          Societe: societe,
          Nom: nom,
          Prenom: prenom,
          Email: email,
          Role: 'client',
          Actif: 'oui',
          Date_Inscription: new Date().toLocaleDateString('fr-FR'),
          Derniere_Connexion: '',
        },
      });

      setMessage('✅ Inscription réussie ! Vous pouvez maintenant vous connecter.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setMessage(`❌ Erreur : ${error.message.includes('email-already') ? 'Adresse email déjà utilisée.' : 'Erreur réseau ou serveur.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-box">
        <h2>Créer un compte</h2>
        {message && <div className="message-box">{message}</div>}
        <input type="text" placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
        <input type="text" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
        <input type="text" placeholder="Société" value={societe} onChange={(e) => setSociete(e.target.value)} required />
        <input type="email" placeholder="Adresse email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Mot de passe" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? 'Inscription...' : 'S’inscrire'}</button>
        <p className="redirect-link">
          Déjà un compte ? <span onClick={() => navigate('/login')}>Connexion</span>
        </p>
      </form>
    </div>
  );
}

export default Register;
