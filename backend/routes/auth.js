// auth.js
const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if email already exists
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Insert new user
    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "User registered" }); // ✅ send only once
      },
    );
  });
});

/// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(400).json({ message: "User not found" });
      }

      const user = result[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Create token
      const token = jwt.sign(
        { id: user.id, role: user.role, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );

      res.json({ token }); // ✅ send only once
    },
  );
});

module.exports = router;
