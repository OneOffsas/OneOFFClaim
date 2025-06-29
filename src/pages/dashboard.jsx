import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import Menu from "@/components/Menu";

export default function Dashboard() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(
          `https://script.google.com/macros/s/AKfycbzm3MrvKRQy75IMnHosYHC1zHvIIxq-kf53ZwV9J2YatrP6C90MCO7JJHjSFxOnQdle/exec?action=listTickets&email=${user.email}`
        );
        const data = await response.json();
        if (data && data.length > 0) {
          setTickets(data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des tickets :", error);
      }
    };

    if (user?.email) {
      fetchTickets();
    }
  }, [user]);

  return (
    <>
      <Menu />
      <div className="max-w-7xl mx-auto mt-6 px-4">
        <h1 className="text-2xl font-bold mb-4">Mes Tickets</h1>

        {tickets.length === 0 ? (
          <p className="text-gray-500">Aucun ticket trouvé.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 border">ID</th>
                  <th className="px-3 py-2 border">Commande</th>
                  <th className="px-3 py-2 border">Problème</th>
                  <th className="px-3 py-2 border">Transporteur</th>
                  <th className="px-3 py-2 border">Statut</th>
                  <th className="px-3 py-2 border">MAJ</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-3 py-2 border">{ticket.ID_Ticket}</td>
                    <td className="px-3 py-2 border">{ticket.Nomero_Commande}</td>
                    <td className="px-3 py-2 border">{ticket.Problematique}</td>
                    <td className="px-3 py-2 border">{ticket.Transporteur}</td>
                    <td className="px-3 py-2 border">{ticket.Statut}</td>
                    <td className="px-3 py-2 border">{ticket.Date_MAJ}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

