// server.js
import express from "express";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 5000;
const __dirname = path.resolve();
const usersFile = path.join(__dirname, "users.json");

app.use(cors());
app.use(bodyParser.json());

// Register
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  let users = [];
  if (fs.existsSync(usersFile)) {
    users = JSON.parse(fs.readFileSync(usersFile));
  }

  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ email, password });
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

  res.status(201).json({ message: "Registration successful" });
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!fs.existsSync(usersFile)) {
    return res.status(400).json({ message: "No users found" });
  }

  const users = JSON.parse(fs.readFileSync(usersFile));
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
