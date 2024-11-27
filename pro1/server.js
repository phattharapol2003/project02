const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

// ตั้งค่าการเชื่อมต่อกับฐานข้อมูล
const db = mysql.createConnection({
    host: 'localhost', // ชื่อโฮสต์ของฐานข้อมูล
    user: 'root',      // ชื่อผู้ใช้งานฐานข้อมูล
    password: 'password', // รหัสผ่าน
    database: 'mydatabase' // ชื่อฐานข้อมูล
});

// ตรวจสอบการเชื่อมต่อกับฐานข้อมูล
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to MySQL database');
    }
});

// ใช้ body-parser เพื่อจัดการข้อมูล JSON
app.use(bodyParser.json());

// API สำหรับการตรวจสอบข้อมูลล็อกอิน
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // ตรวจสอบข้อมูลผู้ใช้ในฐานข้อมูล
    const query = 'SELECT * FROM Users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }
        if (results.length > 0) {
            res.status(200).json({ success: true, message: 'Login successful' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    });
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
