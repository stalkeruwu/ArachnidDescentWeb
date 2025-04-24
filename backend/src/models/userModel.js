const db = require('../config/dbConfig');

async function createUser(username, email, passwordHash) {
    const [result] = await db.query(
        'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
        [username, email, passwordHash]
    );
    return result.insertId;
}

async function getUserByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
}

module.exports = { createUser, getUserByEmail };