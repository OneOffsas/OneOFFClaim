import React, { useState, useEffect } from "react";
import axios from "axios";

const URL_API = "https://script.google.com/macros/s/AKfycbzm3MrvKRQy75IMnHosYHC1zHvIIxq-kf53ZwV9J2YatrP6C90MCO7JJHjSFxOnQdle/exec";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    axios
      .post(URL_API, { action: "getAllUsers" })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => alert("Erreur : " + err.message));
  }, []);

  const handleEdit = (user) => {
    setEditingUserId(user.ID_User);
    setEditedUser({ ...user });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    axios
      .post(URL_API, {
        action: "updateUser",
        ID_User: editedUser.ID_User,
        Societe: editedUser.Societe,
        Nom: editedUser.Nom,
        Prenom: editedUser.Prenom,
        Email: editedUser.Email,
        Role: editedUser.Role,
        Actif: editedUser.Actif,
      })
      .then(() => {
        alert("Utilisateur mis à jour !");
        setEditingUserId(null);
        setEditedUser({});
        return axios.post(URL_API, { action: "getAllUsers" });
      })
      .then((res) => setUsers(res.data))
      .catch((err) => alert("Erreur : " + err.message));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestion des utilisateurs</h1>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nom</th>
            <th className="border p-2">Prénom</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Société</th>
            <th className="border p-2">Rôle</th>
            <th className="border p-2">Actif</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.ID_User} className="text-center">
              {editingUserId === user.ID_User ? (
                <>
                  <td className="border p-1">
                    <input name="Nom" value={editedUser.Nom} onChange={handleChange} />
                  </td>
                  <td className="border p-1">
                    <input name="Prenom" value={editedUser.Prenom} onChange={handleChange} />
                  </td>
                  <td className="border p-1">
                    <input name="Email" value={editedUser.Email} onChange={handleChange} />
                  </td>
                  <td className="border p-1">
                    <input name="Societe" value={editedUser.Societe} onChange={handleChange} />
                  </td>
                  <td className="border p-1">
                    <select name="Role" value={editedUser.Role} onChange={handleChange}>
                      <option value="Client">Client</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>
                  <td className="border p-1">
                    <select name="Actif" value={editedUser.Actif} onChange={handleChange}>
                      <option value="Oui">Oui</option>
                      <option value="Non">Non</option>
                    </select>
                  </td>
                  <td className="border p-1">
                    <button onClick={handleSave} className="bg-green-500 text-white px-2 py-1 rounded">
                      💾 Sauver
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border p-1">{user.Nom}</td>
                  <td className="border p-1">{user.Prenom}</td>
                  <td className="border p-1">{user.Email}</td>
                  <td className="border p-1">{user.Societe}</td>
                  <td className="border p-1">{user.Role}</td>
                  <td className="border p-1">{user.Actif}</td>
                  <td className="border p-1">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      ✏️ Modifier
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
