const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");

const router = express.Router();
const db = new Pool({ connectionString: process.env.DATABASE_URL });

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // 1. Хэшируем пароль (никогда не храним в открытом виде)
  const hash = await bcrypt.hash(password, 10);

  // 2. Сохраняем в базу
  const { rows } = await db.query(
    "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id",
    [email, hash],
  );

  // 3. Выдаём JWT токен
  const token = jwt.sign({ userId: rows[0].id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({ token });
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  if (!rows[0])
    return res.status(401).json({ error: "Нет такого пользователя" });

  const valid = await bcrypt.compare(password, rows[0].password_hash);
  if (!valid) return res.status(401).json({ error: "Неверный пароль" });

  const token = jwt.sign({ userId: rows[0].id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({ token });
});

module.exports = router;
