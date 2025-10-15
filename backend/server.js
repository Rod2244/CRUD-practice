import express from "express";
import cors from "cors";
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes)

// ✅ Test Route
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
