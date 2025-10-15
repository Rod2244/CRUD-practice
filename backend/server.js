import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 🧾 Temporary "database"
let users = [];
let idCounter = 1;

// ➕ CREATE
app.post('/api/users', (req, res) => {
  const { name } = req.body;
  const newUser = { id: idCounter++, name };
  users.push(newUser);
  res.json({ message: 'User added successfully', user: newUser });
});

// 📋 READ
app.get('/api/users', (req, res) => {
  res.json(users);
});

// ✏️ UPDATE
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = users.find(u => u.id === parseInt(id));

  if (!user) return res.status(404).json({ message: 'User not found' });

  user.name = name;
  res.json({ message: 'User updated successfully', user });
});

// 🗑️ DELETE
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  users = users.filter(u => u.id !== parseInt(id));
  res.json({ message: 'User deleted successfully' });
});

// ✅ Test Route
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
