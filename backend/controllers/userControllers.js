let users = [];
let idCounter = 1;

// ➕ CREATE
export const createUser = (req, res) => {
    const { name } = req.body;
    const newUser = { id: idCounter++, name };
    users.push(newUser);
    res.json({ message: 'User added successfully', user: newUser });
};

// 📋 READ
export const getUsers = (req, res) => {
    res.json(users);
};

// ✏️ UPDATE
export const updateUser = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const user = users.find(u => u.id === parseInt(id));

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name;
    res.json({ message: 'User updated successfully', user });
};

// 🗑️ DELETE
export const deleteUser = (req, res) => {
    const { id } = req.params;
    users = users.filter(u => u.id !== parseInt(id));
    res.json({ message: 'User deleted successfully' });
};