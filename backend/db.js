const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('themepark.db', (err) => {
  if (err) {
    console.error('Could not connect to database', err.message);
  } else {
    console.log('Connected to themepark.db');
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT,
    date TEXT
  )
`);

module.exports = db;
