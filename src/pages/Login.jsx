import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();

  const handleConnexion = async (e) => {
    e.preventDefault();
    setErreur('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, motDePasse);
      const user = userCredential.user;

      // 🔄 Vérifier le rôle via Google Sheets Apps Script
      const scriptURL = "https://script.google.com/macros/s/AKfycbzm3MrvKRQy75IMnHosYHC1zHvIIxq-kf53ZwV9J2YatrP6C90MCO7JJHjSFxOnQdle/exec?email=" + encodeURIComponent(user.email);
      const response = await fetch(scriptURL);
      const data = await response.json();

      if (data && data.Role) {
        const role = data.Role.toLowerCase();

        if (role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        setErreur('❌ Impossible de récupérer le rôle utilisateur.');
      }
    } catch (error) {
      console.error(error);
      setErreur("❌ Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Connexion</h2>
        <form onSubmit={handleConnexion}>
          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />
          {erreur && <p className="erreur">{erreur}</p>}
          <button type="submit">Se connecter</button>
        </form>
        <p className="mot-de-passe-oublie">
          <a href="/forgot-password">Mot de passe oublié ?</a>
        </p>
        <p className="inscription-lien">
          Vous n'avez pas de compte ? <a href="/register">Créer un compte</a>
        </p>
      </div>
    </div>
  );
}

export default Login;

