// src/pages/admin/users.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import axios from "axios";

export default function UsersAdmin() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const navigate = useNavigate();

  const URL_API = "https://script.google.com/macros/s/AKfycbzm3MrvKRQy75IMnHosYHC1zHvIIxq-kf53ZwV9J2YatrP6C90MCO7JJHjSFxOnQdle/exec";

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return navigate("/login");

    axios
      .post(URL_API, { action: "getAllUsers" })
      .then((res) => setUsers(res.data))
      .catch((err) => alert("Erreur chargement utilisateurs : " + err.message));
  }, []);

  const handleEdit = (user) => {
    setEditingUserId(user.ID_User);
    setEditedUser(user);
  };

  const handleSave = () => {
    axios
      .post(URL_API, {
        action: "updateUser",
        ...editedUser,
      })
      .then(() => {
        alert("Utilisateur mis à jour !");
        setEditingUserId(null);
        // refresh
        return axios.post(URL_API, { action: "getAllUsers" });
      })
      .then((res) => setUsers(res.data))
      .catch((err) => alert("Erreur mise à jour : " + err.message));
  };

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des Utilisateurs</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Nom</th>
              <th className="border px-4 py-2">Prénom</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Rôle</th>
              <th className="border px-4 py-2">Actif</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.ID_User}>
                <td className="border px-4 py-2">{user.ID_User}</td>
                {editingUserId === user.ID_User ? (
                  <>
                    <td className="border px-2 py-2">
                      <input
                        type="text"
                        name="Nom"
                        value={editedUser.Nom}
                        onChange={handleChange}
                        className="border px-2 py-1 w-full"
                      />
                    </td>
                    <td className="border px-2 py-2">
                      <input
                        type="text"
                        name="Prenom"
                        value={editedUser.Prenom}
                        onChange={handleChange}
                        className="border px-2 py-1 w-full"
                      />
                    </td>
                    <td className="border px-2 py-2">{user.Email}</td>
                    <td className="border px-2 py-2">
                      <select
                        name="Role"
                        value={editedUser.Role}
                        onChange={handleChange}
                        className="border px-2 py-1 w-full"
                      >
                        <option value="Client">Client</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </td>
                    <td className="border px-2 py-2">
                      <select
                        name="Actif"
                        value={editedUser.Actif}
                        onChange={handleChange}
                        className="border px-2 py-1 w-full"
                      >
                        <option value="Oui">Oui</option>
                        <option value="Non">Non</option>
                      </select>
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded"
                        onClick={handleSave}
                      >
                        Enregistrer
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border px-2 py-2">{user.Nom}</td>
                    <td className="border px-2 py-2">{user.Prenom}</td>
                    <td className="border px-2 py-2">{user.Email}</td>
                    <td className="border px-2 py-2">{user.Role}</td>
                    <td className="border px-2 py-2">{user.Actif}</td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                        onClick={() => handleEdit(user)}
                      >
                        Modifier
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
