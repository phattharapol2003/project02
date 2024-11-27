const mysql = require('mysql2');

// ตั้งค่าการเชื่อมต่อ
const connection = mysql.createConnection({
    host: 'localhost', // ที่อยู่เซิร์ฟเวอร์ของฐานข้อมูล
    user: 'root',      // ชื่อผู้ใช้งาน MySQL
    password: 'password', // รหัสผ่าน
    database: 'mydatabase' // ชื่อฐานข้อมูล
});

// ทดสอบการเชื่อมต่อ
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the MySQL database.');
    }
});

module.exports = connection;

const { Sequelize } = require('sequelize');

// ตั้งค่าการเชื่อมต่อ
const sequelize = new Sequelize('mydatabase', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql', // ประเภทฐานข้อมูลที่ใช้ (MySQL)
});

// ทดสอบการเชื่อมต่อ
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;
