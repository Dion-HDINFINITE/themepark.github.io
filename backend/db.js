// backend/db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'database.sqlite');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Gagal membuka database:', err.message);
    process.exit(1);
  }
  console.log('Terhubung ke SQLite database.');
});

// USERS table
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

// USER_TICKETS table — FIXED version with subtitle + quantity
const createUserTicketsTable = `
CREATE TABLE IF NOT EXISTS user_tickets (
  user_ticket_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT DEFAULT '',
  description TEXT DEFAULT '',
  quantity INTEGER DEFAULT 1,
  purchase_date DATETIME DEFAULT (datetime('now', 'localtime')),
  status TEXT DEFAULT 'Aktif',
  FOREIGN KEY (user_id) REFERENCES users(id)
);
`;

db.run(createUserTicketsTable, (err) => {
  if (err) {
    console.error('Gagal membuat tabel user_tickets:', err.message);
  } else {
    console.log('Tabel "user_tickets" siap digunakan.');
  }
});

module.exports = db;
