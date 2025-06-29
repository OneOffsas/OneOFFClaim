// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCpID48jYipLpLtXCos25vdjwi_giDW2hU",
  authDomain: "authclaimoneoff.firebaseapp.com",
  projectId: "authclaimoneoff",
  storageBucket: "authclaimoneoff.firebasestorage.app",
  messagingSenderId: "73634736255",
  appId: "1:73634736255:web:38c3303d31b4219fb2b74a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
