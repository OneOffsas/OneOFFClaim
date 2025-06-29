import React, { useEffect, useState } from "react";
import { getTickets } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import Menu from "@/components/Menu";

export default function Dashboard() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      const fetchTickets = async () => {
        try {
          const data = await getTickets(user.role === "admin" ? null : user.email);
          setTickets(data.tickets || []);
        } catch (error) {
          console.error("Erreur lors du chargement des tickets :", error);
        } finally {
          setLoading(false);
        }
      };
      fetchTickets();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Menu />
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Bienvenue {user?.nom} 👋</h1>
        <h2 className="text-xl font-semibold mb-6">Liste des tickets</h2>

        {loading ? (
          <p>Chargement des tickets...</p>
        ) : tickets.length === 0 ? (
          <p>Aucun ticket trouvé.</p>
        ) : (
          <div className="overflow-auto rounded shadow bg-white">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Commande</th>
                  <th className="px-4 py-2">Transporteur</th>
                  <th className="px-4 py-2">Problématique</th>
                  <th className="px-4 py-2">Statut</th>
                  <th className="px-4 py-2">Date MAJ</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.ID_Ticket} className="border-t">
                    <td className="px-4 py-2">{ticket.ID_Ticket}</td>
                    <td className="px-4 py-2">{ticket.Nomero_Commande}</td>
                    <td className="px-4 py-2">{ticket.Transporteur}</td>
                    <td className="px-4 py-2">{ticket.Problematique}</td>
                    <td className="px-4 py-2">{ticket.Statut}</td>
                    <td className="px-4 py-2">{ticket.Date_MAJ}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

