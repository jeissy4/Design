import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = path.join(__dirname, 'uploads');
    if (!fs.existsSync(folder)) fs.mkdirSync(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, name);
  }
});

const upload = multer({ storage });

(async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Serve uploaded files statically
  app.use('/uploads', express.static('uploads'));


  // Database connection
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
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
        return res.status(409).json({ message: 'Phone number already registered.' });
      }

      await db.query(
        'INSERT INTO customer (phone_no, name) VALUES (?, ?)',
        [phone_no, name]
      );

      res.status(200).json({ message: 'Registration successful!' });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Server error during registration.' });
    }
  });

  // Visit with image upload
  app.post('/visit', upload.single('design_image'), async (req, res) => {
    const { name, phone_no, design_type, size, visit_date } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    try {
      const [customer] = await db.query('SELECT * FROM customer WHERE phone_no = ?', [phone_no]);
      if (customer.length === 0) {
        return res.status(400).json({ message: 'Customer not registered.' });
      }

      await db.query(
        'INSERT INTO visit (name, phone_no, design_type, size, visit_date, image_url) VALUES (?, ?, ?, ?, ?, ?)',
        [name, phone_no, design_type, size, visit_date, image_url]
      );

      res.status(200).json({ message: 'Visit data saved successfully.' });
    } catch (err) {
      console.error('Error inserting visit data:', err);
      res.status(500).json({ message: 'Server error inserting visit data.' });
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
      res.status(500).json({ message: 'Server error inserting finance data.' });
    }
  });

  // Search
  app.get('/api/search', async (req, res) => {
    const { query } = req.query;

    try {
      const [results] = await db.query(
        `SELECT name, phone_no FROM customer WHERE name LIKE ? OR phone_no LIKE ?`,
        [`%${query}%`, `%${query}%`]
      );

      res.json(results);
    } catch (err) {
      console.error('Error searching customer:', err);
      res.status(500).json({ message: 'Server error searching customer.' });
    }
  });

  // Report
  app.get('/api/report', async (req, res) => {
    const { phone_no } = req.query;

    try {
      const [registrationResults] = await db.query('SELECT * FROM customer WHERE phone_no = ?', [phone_no]);
      const [visitResults] = await db.query('SELECT * FROM visit WHERE phone_no = ?', [phone_no]);
      const [financeResults] = await db.query('SELECT * FROM finance WHERE phone_no = ?', [phone_no]);

      res.json({
        registration: registrationResults,
        visits: visitResults,
        finance: financeResults
      });
    } catch (err) {
      console.error('Error fetching report data:', err);
      res.status(500).json({ message: 'Server error fetching report data.' });
    }
  });

  
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
})();