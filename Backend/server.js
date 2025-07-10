import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import dotenv from 'dotenv';



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('MySQL not connected:', err);
        return;
    }
    console.log('MySQL connected successfully!');
});
//registration
app.post('/registration', (req, res) => {
    const { phone_no, name } = req.body;
    const query = 'INSERT INTO customer (phone_no, name) VALUES (?, ?)';
    
    db.query(query, [phone_no, name], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Error inserting data' });
        }
        res.status(200).json({ message: 'Registration data inserted successfully' });
    });
});

//visit
app.post('/visit',(req,res)=>{
    const { name, phone_no, design_type, size, visit_date } = req.body;

   //check if registered
  const checkCustomerQuery = 'SELECT * FROM customer WHERE phone_no = ?';

  db.query(checkCustomerQuery, [phone_no], (err, results) => {
    if (err) {
      console.error('Error checking customer:', err);
      return res.status(500).json({ message: 'Database error while checking customer' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Customer not registered. Please register before logging a visit.' });
    }


    const query = 'INSERT INTO visit (name, phone_no, design_type, size, visit_date) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [name, phone_no, design_type, size, visit_date], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Error inserting data' });
        }
        res.status(200).json({ message: 'Visit data inserted successfully' });
    });
  });
});

// Finance 
app.post('/finance', (req, res) => {
    const { name, phone_no, total, amount_paid, payment_date } = req.body;

    // Check if required fields are provided
    if (!name || !phone_no || !total || !amount_paid || !payment_date) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Calculate remaining amount
    const remaining = total - amount_paid;

    // Insert data into the finance table without the remainder column
    const query = `
        INSERT INTO finance (phone_no, name, total, amount_paid, payment_date)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(query, [phone_no, name, total, amount_paid, payment_date], (err, results) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ message: "Error inserting data into finance table." });
        }
        res.status(200).json({ message: "Finance data inserted successfully." });
    });
});


// Search 
app.get('/api/search', (req, res) => {
    const { query } = req.query; 
    const sql = `
        SELECT c.name, c.phone_no
        FROM customer c
        WHERE c.name LIKE ? OR c.phone_no LIKE ?
    `;
    const values = [`%${query}%`, `%${query}%`];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error searching customer:', err);
            return res.status(500).json({ message: 'Error searching customer' });
        }
        res.json(results); 
    });
});

// Report 
// Report endpoint
app.get('/api/report', (req, res) => {
    const { phone_no } = req.query; 

    const registrationQuery = 'SELECT * FROM customer WHERE phone_no = ?';
    const visitQuery = 'SELECT * FROM visit WHERE phone_no = ?';
    const financeQuery = 'SELECT * FROM finance WHERE phone_no = ?';

    db.query(registrationQuery, [phone_no], (err, registrationResults) => {
        if (err) {
            console.error('Error fetching registration data:', err);
            return res.status(500).json({ message: 'Error fetching registration data' });
        }

        db.query(visitQuery, [phone_no], (err, visitResults) => {
            if (err) {
                console.error('Error fetching visit data:', err);
                return res.status(500).json({ message: 'Error fetching visit data' });
            }

            db.query(financeQuery, [phone_no], (err, financeResults) => {
                if (err) {
                    console.error('Error fetching finance data:', err);
                    return res.status(500).json({ message: 'Error fetching finance data' });
                }

                const report = {
                    registration: registrationResults,
                    visits: visitResults,
                    finance: financeResults,
                };

                
                res.json(report); 
            });
        });
    });
});





app.listen(4000,()=>{
    console.log("server is running on port 4000");
});
