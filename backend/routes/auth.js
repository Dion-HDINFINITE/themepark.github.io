const express = require('express');
const db = require('../db');

const router = express.Router();

// REGISTER
router.post('/register', (req, res) => {
  const { email, username, password } = req.body;
  console.log('Register request:', { email, username });

  if (!email || !username || !password) {
    console.log('Register error: Missing fields');
    return res.status(400).json({ success: false, message: 'Semua field harus diisi.' });
  }

  const insertQuery = `INSERT INTO users (email, username, password) VALUES (?, ?, ?)`;

  db.run(insertQuery, [email, username, password], function (err) {
    if (err) {
      console.log('Register DB error:', err.message);
      if (err.message.includes('UNIQUE constraint')) {
        return res.status(409).json({ success: false, message: 'Email atau username sudah digunakan' });
      }
      return res.status(500).json({ success: false, message: 'Kesalahan server' });
    }

    console.log('User registered with ID:', this.lastID);
    res.status(201).json({ success: true, message: 'Registrasi berhasil', userId: this.lastID });
  });
});

// LOGIN
router.post('/login', (req, res) => {
  const username = req.body.username?.trim();
  const password = req.body.password?.trim();

  console.log('Login attempt:', { username });

  if (!username || !password) {
    console.log('Login error: Missing username or password');
    return res.status(400).json({ error: 'Username and password are required' });
  }

  db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, user) => {
    if (err) {
      console.log('Login DB error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (!user) {
      console.log('Login failed: Invalid credentials');
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    console.log('Login successful:', user);
    res.json({ message: 'Login successful', username: user.username, userId: user.id });
  });
});

// BUY TICKET — fixed, matches table now!
router.post('/buy-ticket', (req, res) => {
  const { userId, title, description, quantity } = req.body;
  console.log('Buy ticket request:', { userId, title, description, quantity });

  if (!userId || !title || !quantity || quantity <= 0) {
    console.log('Buy ticket error: Missing fields');
    return res.status(400).json({ error: 'Missing required fields or invalid quantity' });
  }

const insertQuery = `
  INSERT INTO user_tickets (user_id, title, description, status, purchase_date, quantity)
  VALUES (?, ?, ?, ?, datetime('now'), ?)
`;

db.run(insertQuery, [userId, title, description || '', 'Aktif', quantity], function (err) {
  if (err) {
    console.error('Error inserting ticket:', err.message);
    return res.status(500).json({ error: 'Failed to buy ticket' });
  }

  console.log('Ticket purchased, ID:', this.lastID);
  res.json({ message: 'Ticket purchased successfully', ticketId: this.lastID });
});

});

// GET MY TICKETS
router.get('/my-tickets', (req, res) => {
  const userId = req.query.userId;
  console.log('Fetch tickets request for userId:', userId);

  if (!userId) {
    console.log('Fetch tickets error: Missing userId');
    return res.status(400).json({ error: 'Missing userId' });
  }

  const selectQuery = `
    SELECT 
      user_ticket_id AS id,
      title,
      subtitle,
      description,
      status,
      quantity,
      purchase_date AS date
    FROM user_tickets 
    WHERE user_id = ? 
    ORDER BY purchase_date DESC
  `;

  db.all(selectQuery, [userId], (err, rows) => {
    if (err) {
      console.error('Error fetching tickets:', err.message);
      return res.status(500).json({ error: 'Failed to fetch tickets' });
    }

    console.log(`Found ${rows.length} tickets for user ${userId}`);
    rows.forEach((r, i) => console.log(`Ticket[${i}]:`, r));

    res.json({ tickets: rows });
  });
});

// CANCEL TICKET — works!
router.post('/cancel-ticket', (req, res) => {
  const { ticketId, userId } = req.body;
  console.log('Cancel ticket request:', { ticketId, userId });

  const ticketIdNum = parseInt(ticketId);
  const userIdNum = parseInt(userId);

  if (!ticketId || !userId || isNaN(ticketIdNum) || isNaN(userIdNum)) {
    console.log('Cancel ticket error: Missing or invalid ticketId/userId');
    return res.status(400).json({ error: 'Missing or invalid ticketId or userId' });
  }

  db.get(`SELECT purchase_date, user_id FROM user_tickets WHERE user_ticket_id = ?`, [ticketIdNum], (err, row) => {
    if (err || !row) {
      console.log('Cancel ticket error: Ticket not found or DB error', err);
      return res.status(404).json({ error: 'Ticket not found' });
    }

    if (row.user_id !== userIdNum) {
      console.log('Cancel ticket error: Ticket does not belong to user');
      return res.status(403).json({ error: 'Unauthorized to cancel this ticket' });
    }

    const purchaseTime = new Date(row.purchase_date);
    const now = new Date();
    const diffMs = now - purchaseTime;
    const diffMinutes = diffMs / (1000 * 60);

    console.log('Time since purchase (minutes):', diffMinutes);

    // if (diffMinutes > 1) {
    //   console.log('Cancel ticket rejected: more than 1 minute passed');
    //   console.log(`Rejecting cancel: ticket purchased ${diffMinutes.toFixed(2)} minutes ago`);
    //   return res.status(400).json({ error: 'Cannot cancel ticket after 1 minute' });
    // }

    const updateQuery = `UPDATE user_tickets SET status = 'Dibatalkan' WHERE user_ticket_id = ?`;

    db.run(updateQuery, [ticketIdNum], function (err2) {
      if (err2) {
        console.error('Error cancelling ticket:', err2.message);
        return res.status(500).json({ error: 'Failed to cancel ticket' });
      }

      console.log('Ticket cancelled successfully:', ticketIdNum);
      res.json({ message: 'Ticket cancelled successfully' });
    });
  });
});

module.exports = router;
