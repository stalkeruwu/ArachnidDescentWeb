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

async function updateResetPasswordToken(userId, resetToken, expiry) {
    await db.query('UPDATE users SET reset_password_token = ?, reset_token_expiry = ? WHERE id = ?', [resetToken, expiry, userId]);
}

async function getUserByResetToken(token) {
    const [rows] = await db.query('SELECT * FROM users WHERE reset_password_token = ? AND reset_token_expiry > ?', [token, new Date()]);
    return rows[0];
}

async function updatePassword(userId, hashedPassword) {
    await db.query('UPDATE users SET password_hash = ?, reset_password_token = NULL, reset_token_expiry = NULL WHERE id = ?', [hashedPassword, userId]);
}

async function assignDefaultSkin(userId) {
    const pumpkinSkinId = 1; // Assuming the Pumpkin skin has an ID of 1 in the database
    await db.query('INSERT INTO user_skin (user_id, skin_id) VALUES (?, ?)', [userId, pumpkinSkinId]);
}

module.exports = {
     createUser,
      getUserByEmail,
       updateUserVerificationToken,
        getUserByVerificationToken,
         markUserAsVerified,
         updateResetPasswordToken,
         getUserByResetToken,
         updatePassword,
         assignDefaultSkin
        };
