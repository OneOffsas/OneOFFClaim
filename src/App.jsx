// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<div className="p-10 text-xl">Bienvenue sur ClaimOneOff 🎯</div>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
