import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzm3MrvKRQy75IMnHosYHC1zHvIIxq-kf53ZwV9J2YatrP6C90MCO7JJHjSFxOnQdle/exec?action=getUsers"
    );
    const data = await response.json();
    setUsers(data);
  };

  const handleChange = (index, field, value) => {
    const updated = [...users];
    updated[index][field] = value;
    setUsers(updated);
  };

  const handleSave = async (user) => {
    try {
      const response = await axios.post(
        "https://script.google.com/macros/s/AKfycbzm3MrvKRQy75IMnHosYHC1zHvIIxq-kf53ZwV9J2YatrP6C90MCO7JJHjSFxOnQdle/exec",
        {
          action: "updateUser",
          ID_User: user.ID_User,
          Role: user.Role,
          Actif: user.Actif,
        }
      );
      setMessage(`✔️ Modifications enregistrées pour ${user.Prenom}`);
    } catch (error) {
      setMessage("❌ Erreur lors de la mise à jour");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gestion des utilisateurs</h2>
      {message && <div className="mb-2 text-sm text-blue-700">{message}</div>}
      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Prénom</th>
            <th className="p-2 border">Nom</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Rôle</th>
            <th className="p-2 border">Actif</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.ID_User}>
              <td className="p-2 border">{user.ID_User}</td>
              <td className="p-2 border">{user.Prenom}</td>
              <td className="p-2 border">{user.Nom}</td>
              <td className="p-2 border">{user.Email}</td>
              <td className="p-2 border">
                <select
                  value={user.Role}
                  onChange={(e) =>
                    handleChange(index, "Role", e.target.value)
                  }
                  className="border rounded px-2 py-1"
                >
                  <option value="client">client</option>
                  <option value="admin">admin</option>
                </select>
              </td>
              <td className="p-2 border">
                <select
                  value={user.Actif}
                  onChange={(e) =>
                    handleChange(index, "Actif", e.target.value)
                  }
                  className="border rounded px-2 py-1"
                >
                  <option value="oui">oui</option>
                  <option value="non">non</option>
                </select>
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => handleSave(user)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Enregistrer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
