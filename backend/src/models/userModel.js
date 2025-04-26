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

async function updateUserVerificationToken(userId, token) {
    await db.query('UPDATE users SET verification_token = ? WHERE id = ?', [token, userId]);
}

async function getUserByVerificationToken(token) {
    const [rows] = await db.query('SELECT * FROM users WHERE verification_token = ?', [token]);
    return rows[0];
}

async function markUserAsVerified(userId) {
    await db.query('UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE id = ?', [userId]);
}

module.exports = {
     createUser,
      getUserByEmail,
       updateUserVerificationToken,
        getUserByVerificationToken,
         markUserAsVerified 
        };
