// // const express = require("express");
// // const router = express.Router();
// // const controller = require("../Controllers/userController");

// // router.post("/new", controller.addUser);
// // router.get("/view", controller.getUsers);
// // router.put("/update/:id", controller.updateUser);
// // router.delete("/delete/:id", controller.deleteUser);

// // module.exports = router;




// const express = require("express");
// const router = express.Router();
// const usercontroller = require("../Controllers/userController");
// const authMiddleware = require("../middleware/authMiddleware");

// /* ================= AUTH ================= */

// // Register
// router.post("/register", usercontroller.registerUser);

// // Login
// router.post("/login", usercontroller.loginUser);


// /* ================= CRUD (Protected) ================= */

// // View all users
// router.get("/view", authMiddleware, usercontroller.getUsers);

// // Add user (Admin / Logged user)
// router.post("/new", authMiddleware, usercontroller.addUser);

// // Update user
// router.put("/update/:id", authMiddleware, usercontroller.updateUser);

// // Delete user
// router.delete("/delete/:id", authMiddleware, usercontroller.deleteUser);

// module.exports = router;



const express = require("express");
const router = express.Router();
const User = require("../models/User");


// ===============================
// REGISTER
// ===============================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    const newUser = new User({
      name,
      email,
      password
    });

    await newUser.save();

    res.json({
      message: "Registered Successfully"
    });

  } catch (err) {
    res.status(500).json({
      message: "Register Failed"
    });
  }
});


// ===============================
// LOGIN
// ===============================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({
        message: "Invalid Credentials"
      });
    }

    res.json({
      token: "sampletoken123",
      user: {
        id: user._id,
        role: "user"
      }
    });

  } catch (err) {
    res.status(500).json({
      message: "Login Failed"
    });
  }
});


// ===============================
// GET ALL USERS
// ===============================
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Fetch Failed" });
  }
});


// ===============================
// ADD USER
// ===============================
router.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json({ message: "User Added Successfully" });
  } catch (err) {
    res.status(400).json({ message: "Add Failed" });
  }
});


// ===============================
// UPDATE USER
// ===============================
router.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: "Update Failed" });
  }
});


// ===============================
// DELETE USER
// ===============================
router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User Deleted Successfully" });
  } catch (err) {
    res.status(400).json({ message: "Delete Failed" });
  }
});


module.exports = router;
