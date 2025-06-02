const express = require('express');
const db = require('../db');

const router = express.Router();

router.post('/register', (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ success: false, message: 'Semua field harus diisi.' });
  }

  const insertQuery = `INSERT INTO users (email, username, password) VALUES (?, ?, ?)`;

  db.run(insertQuery, [email, username, password], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint')) {
        return res.status(409).json({ success: false, message: 'Email atau username sudah digunakan' });
      }
      return res.status(500).json({ success: false, message: 'Kesalahan server' });
    }

    res.status(201).json({ success: true, message: 'Registrasi berhasil', userId: this.lastID });
  });
});

router.post('/register', (req, res) => {
  const email = req.body.email?.trim();
  const username = req.body.username?.trim();
  const password = req.body.password?.trim();

  if (!email || !username || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const insertQuery = `INSERT INTO users (email, username, password) VALUES (?, ?, ?)`;

  db.run(insertQuery, [email, username, password], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint')) {
        return res.status(409).json({ error: 'Email or username already in use' });
      }
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(201).json({ message: 'User registered successfully', userId: this.lastID });
  });
});

router.post('/login', (req, res) => {
  const username = req.body.username?.trim();
  const password = req.body.password?.trim();

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(401).json({ error: 'Invalid username or password' });

    res.json({ message: 'Login successful', username: user.username });
  });
});

module.exports = router;
