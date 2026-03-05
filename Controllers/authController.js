// const User = require("../models/User");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const register = async (req, res) => {
//   const { name, email, password } = req.body;
//   const hash = await bcrypt.hash(password, 10);
//   const user = await User.create({ name, email, password: hash });
//   res.json({ message: "Registered", user });
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).json({ message: "User not found" });

//   const match = await bcrypt.compare(password, user.password);
//   if (!match) return res.status(401).json({ message: "Wrong password" });

//   const token = jwt.sign({ id: user._id }, "SECRET", { expiresIn: "1d" });
//   res.json({ token });
// };




// module.exports = {
//   register,
//   login
// };
