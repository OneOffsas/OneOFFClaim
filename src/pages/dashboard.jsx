// src/pages/dashboard.jsx

import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://sheets.googleapis.com/v4/spreadsheets/1k-zA8QpKMAjXN7ppPABiBn8ckKGOZ6FG-hO2zbuPfTs/values/Tickets_ClaimOneOff?key=AIzaSyCpID48jYipLpLtXCos25vdjwi_giDW2hU"
    )
      .then((res) => res.json())
      .then((data) => {
        const rows = data.values;
        const headers = rows[0];
        const ticketsFormatted = rows
          .slice(1)
          .map((row) =>
            headers.reduce((obj, header, i) => {
              obj[header] = row[i] || "";
              return obj;
            }, {})
          );
        setTickets(ticketsFormatted);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur de chargement des tickets :", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">🎫 Mes Tickets</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Commande</th>
                <th className="p-3">Transporteur</th>
                <th className="p-3">Problématique</th>
                <th className="p-3">Statut</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{ticket.ID_Ticket}</td>
                  <td className="p-3">{ticket.Nomero_Commande}</td>
                  <td className="p-3">{ticket.Transporteur}</td>
                  <td className="p-3">{ticket.Problematique}</td>
                  <td className="p-3 font-medium text-blue-600">
                    {ticket.Statut}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
