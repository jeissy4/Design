import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    
  });

  console.log('MySQL connected successfully!');

  // Registration 
  app.post('/registration', async (req, res) => {
    const { phone_no, name } = req.body;

    try {
      const [existingUser] = await db.query(
        'SELECT * FROM customer WHERE phone_no = ?',
        [phone_no]
      );

      if (existingUser.length > 0) {
        return res
          .status(409)
          .json({ message: 'Phone number already registered. Please use a unique number.' });
      }

      await db.query(
        'INSERT INTO customer (phone_no, name) VALUES (?, ?)',
        [phone_no, name]
      );

      res.status(200).json({ message: 'Registration successful!' });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Server error. Please try again.' });
    }
  });

  // Visit
  app.post('/visit', async (req, res) => {
    const { name, phone_no, design_type, size, visit_date } = req.body;

    try {
      const [customer] = await db.query(
        'SELECT * FROM customer WHERE phone_no = ?',
        [phone_no]
      );

      if (customer.length === 0) {
        return res.status(400).json({
          message: 'Customer not registered. Please register before logging a visit.'
        });
      }

      await db.query(
        'INSERT INTO visit (name, phone_no, design_type, size, visit_date) VALUES (?, ?, ?, ?, ?)',
        [name, phone_no, design_type, size, visit_date]
      );

      res.status(200).json({ message: 'Visit data inserted successfully' });
    } catch (err) {
      console.error('Error inserting visit data:', err);
      res.status(500).json({ message: 'Error inserting data' });
    }
  });

  // Finance 
  app.post('/finance', async (req, res) => {
    const { name, phone_no, total, amount_paid, payment_date } = req.body;

    if (!name || !phone_no || !total || !amount_paid || !payment_date) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
      await db.query(
        'INSERT INTO finance (phone_no, name, total, amount_paid, payment_date) VALUES (?, ?, ?, ?, ?)',
        [phone_no, name, total, amount_paid, payment_date]
      );

      res.status(200).json({ message: 'Finance data inserted successfully.' });
    } catch (err) {
      console.error('Error inserting finance data:', err);
      res.status(500).json({ message: 'Error inserting data into finance table.' });
    }
  });

  // Search
  app.get('/api/search', async (req, res) => {
    const { query } = req.query;

    try {
      const [results] = await db.query(
        `SELECT c.name, c.phone_no
         FROM customer c
         WHERE c.name LIKE ? OR c.phone_no LIKE ?`,
        [`%${query}%`, `%${query}%`]
      );

      res.json(results);
    } catch (err) {
      console.error('Error searching customer:', err);
      res.status(500).json({ message: 'Error searching customer' });
    }
  });

  // Report 
  app.get('/api/report', async (req, res) => {
    const { phone_no } = req.query;

    try {
      const [registrationResults] = await db.query(
        'SELECT * FROM customer WHERE phone_no = ?',
        [phone_no]
      );
      const [visitResults] = await db.query(
        'SELECT * FROM visit WHERE phone_no = ?',
        [phone_no]
      );
      const [financeResults] = await db.query(
        'SELECT * FROM finance WHERE phone_no = ?',
        [phone_no]
      );

      const report = {
        registration: registrationResults,
        visits: visitResults,
        finance: financeResults
      };

      res.json(report);
    } catch (err) {
      console.error('Error fetching report data:', err);
      res.status(500).json({ message: 'Error fetching report data' });
    }
  });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
