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
    <div className="main">
      <h1>👤 CRUD with React + Express (Fetch API)</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleSubmit}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <ul>
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              {user.name}{" "}
              <button onClick={() => handleEdit(user)}>✏️ Edit</button>{" "}
              <button onClick={() => handleDelete(user.id)}>🗑️ Delete</button>
            </li>
          ))
        ) : (
          <li>No users yet.</li>
        )}
      </ul>
    </div>
  );
}

export default App;
