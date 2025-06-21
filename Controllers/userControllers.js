const bcrypt = require("bcryptjs");
const Users = require("../Models/userModel");


// Register
exports.userRegister = async (req, res) => {
    try {
        const { email, password, username, mobile } = req.body;
        if (!email || !password || !username || !mobile) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new Users({ email, password: hashedPassword, username, mobile });
        await user.save();

        res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Login
exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Logout (basic message only, no token handling)
exports.userLogout = async (req, res) => {
    try {
        res.status(200).json({ message: "User logged out successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all users
// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await Users.find();

        // Format users to include 'id' instead of '_id'
        const formattedUsers = users.map(user => ({
            ...user._doc,
            id: user._id.toString(),
        }));

        res.status(200).json(formattedUsers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get user by ID
exports.getUsers = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User found", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add new user
exports.addUser = async (req, res) => {
    try {
        const { email, password, username, mobile } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new Users({ email, password: hashedPassword, username, mobile });
        await user.save();
        res.status(201).json({ message: "User added successfully", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const updates = req.body;
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }
        const user = await Users.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User updated", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await Users.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



