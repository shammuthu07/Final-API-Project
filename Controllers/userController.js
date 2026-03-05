// const User = require("../models/User");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// /* ========== REGISTER ========== */
// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const exists = await User.findOne({ email });
//     if (exists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashed = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashed
//     });

//     res.status(201).json({ message: "Registered successfully", user });
//   } catch (err) {
//     res.status(500).json({ message: "Register failed" });
//   }
// };

// /* ========== LOGIN ========== */
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(401).json({ message: "Invalid password" });

//     const token = jwt.sign(
//       { id: user._id },
//       "SECRET_KEY",
//       { expiresIn: "1d" }
//     );

//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ message: "Login failed" });
//   }
// };

// /* ========== CRUD ========== */
// const getUsers = async (req, res) => {
//   const users = await User.find();
//   res.json({ data: users });
// };

// const addUser = async (req, res) => {
//   const { name, email, password } = req.body;
//   const hashed = await bcrypt.hash(password, 10);
//   const user = await User.create({ name, email, password: hashed });
//   res.json({ message: "User added", user });
// };

// const updateUser = async (req, res) => {
//   const updated = await User.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );
//   res.json({ message: "User updated", updated });
// };

// const deleteUser = async (req, res) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.json({ message: "User deleted" });
// };


// module.exports = {
//   registerUser,
//   loginUser,
//   addUser,
//   getUsers,
//   updateUser,
//   deleteUser
// };





const User = require("../models/User");

const register = async (req, res) => {
  try {
    const exist = await User.findOne({ email: req.body.email });
    if (exist) return res.status(400).json({ message: "Email already exists" });

    const user = await User.create(req.body);
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || user.password !== req.body.password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    res.json({ user, token: "dummy-token" });  // Add JWT in production
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addUser = async (req, res) => {
  try {
    const exist = await User.findOne({ email: req.body.email });
    if (exist) return res.status(400).json({ message: "Email already exists" });

    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login, addUser, getUsers, deleteUser };