require('dotenv').config(); // Load environment variables from .env file
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'vizsgaremek',
});

// Test the database connection
pool.query('SELECT 1')
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.error('Database connection error:', err));

module.exports = pool;