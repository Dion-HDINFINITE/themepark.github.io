// backend/db.js

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Letakkan file SQLite di backend/database.sqlite (akan otomatis dibuat jika belum ada)
const DB_PATH = path.join(__dirname, 'database.sqlite');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Gagal membuka database:', err.message);
    process.exit(1);
  }
  console.log('Terhubung ke SQLite database.');
});

// Buat tabel "users" jika belum ada:
// - id       : INTEGER PRIMARY KEY AUTOINCREMENT
// - email    : TEXT (unique)
// - username : TEXT (unique)
// - password : TEXT (hashed)
const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;

db.run(createUsersTable, (err) => {
  if (err) {
    console.error('Gagal membuat tabel users:', err.message);
  } else {
    console.log('Tabel "users" siap digunakan.');
  }
});

module.exports = db;
