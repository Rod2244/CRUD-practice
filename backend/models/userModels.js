import db from "../database/db.js";

export const getAllUsers = (callback) => {
  const sql = "SELECT * FROM users";
  db.query(sql, callback);
};

export const createUserModel = (name, callback) => {
  const sql = "INSERT INTO users (name) VALUES (?)";
  db.query(sql, [name], callback);
};

export const updateUserModel = (id, name, callback) => {
  const sql = "UPDATE users SET name = ? WHERE id = ?";
  db.query(sql, [name, id], callback);
};

export const deleteUserModel = (id, callback) => {
  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [id], callback);
};
