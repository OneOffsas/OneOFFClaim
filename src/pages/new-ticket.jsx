import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/AuthContext";
import { addTicket } from "@/lib/api";
import Menu from "@/components/Menu";

export default function NewTicket() {
  const { user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    Nomero_Commande: "",
    SLA_Cible: "",
    Transporteur: "",
    Problematique: "",
    Description: "",
    Urgence: "Normale",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ticket = {
      ...formData,
      Email: user.email,
      utilisateur: `${user.prenom} ${user.nom}`,
      Role: user.role,
      Date_Ouverture: new Date().toLocaleDateString("fr-FR"),
      Statut: "Ouvert",
      Date_MAJ: new Date().toLocaleDateString("fr-FR"),
      ID_Ticket: `T-${Date.now()}`,
    };

    try {
      await addTicket(ticket);
      alert("✅ Ticket créé avec succès !");
      router.push("/dashboard");
    } catch (error) {
      console.error("Erreur :", error);
      alert("❌ Erreur lors de la création du ticket.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Menu />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Créer un nouveau ticket</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
          <div>
            <label className="block font-semibold">Numéro de commande</label>
            <input name="Nomero_Commande" value={formData.Nomero_Commande} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block font-semibold">SLA Cible</label>
            <input name="SLA_Cible" value={formData.SLA_Cible} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block font-semibold">Transporteur</label>
            <select name="Transporteur" value={formData.Transporteur} onChange={handleChange} required className="w-full p-2 border rounded">
              <option value="">-- Choisir --</option>
              <option value
