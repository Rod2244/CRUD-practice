import { useState, useEffect } from "react";
import "./App.css";

const API_URL = "http://localhost:5050/api/users";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  // 🔁 Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ➕ Add or ✏️ Update
  const handleSubmit = async () => {
    try {
      if (!name.trim()) return;

      if (editId) {
        await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });
      }

      setName("");
      setEditId(null);
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  // 📝 Edit
  const handleEdit = (user) => {
    setName(user.name);
    setEditId(user.id);
  };

  // 🗑️ Delete
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="pt-75 min-h-screen bg-gray-900 flex flex-col items-center py-12 px-4 text-white">
      <div className="max-w-lg w-full bg-gray-800 rounded-xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          👤 CRUD with React + Express
        </h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              editId
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

        <ul className="space-y-2">
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <li
                key={user.id}
                className="flex justify-between items-center bg-gray-700 rounded-lg px-4 py-2"
              >
                <span className="text-lg">{user.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-sm font-medium"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-medium"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-400">No users yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
