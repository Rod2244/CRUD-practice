import { getAllUsers, createUserModel, updateUserModel, deleteUserModel } from "../models/userModels.js";

// ➕ CREATE
export const createUser = (req, res) => {
  const { name } = req.body;

  createUserModel([name], (err, result) => {
    if (err) {
      console.error("❌ Error creating user:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "User added successfully", user: { id: result.insertId, name } });
  });
};

// 📋 READ
export const getUsers = (req, res) => {

  getAllUsers((err, results) => {
    if (err) {
      console.error("❌ Error fetching users:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
};

// ✏️ UPDATE
export const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  updateUserModel([name, id], (err) => {
    if (err) {
      console.error("❌ Error updating user:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "User updated successfully" });
  });
};

// 🗑️ DELETE
export const deleteUser = (req, res) => {
  const { id } = req.params;

  deleteUserModel([id], (err) => {
    if (err) {
      console.error("❌ Error deleting user:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "User deleted successfully" });
  });
};
