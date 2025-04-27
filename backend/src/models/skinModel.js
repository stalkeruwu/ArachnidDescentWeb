const db = require('../config/dbConfig');

async function getAllSkinsWithOwnership(userId) {
    const query = `
        SELECT 
            skins.id AS skin_id,
            skins.name AS skin_name,
            rarities.name AS rarity_name,
            rarities.price AS rarity_price,
            skins.image_url AS skin_image_url,
            CASE 
                WHEN user_skin.user_id IS NOT NULL THEN TRUE
                ELSE FALSE
            END AS is_owned
        FROM skins
        LEFT JOIN rarities ON skins.rarity_id = rarities.id
        LEFT JOIN user_skin ON skins.id = user_skin.skin_id AND user_skin.user_id = ?
    `;
    const [rows] = await db.query(query, [userId]);

    // Convert is_owned to a boolean
    return rows.map(row => ({
        ...row,
        is_owned: !!row.is_owned, // Convert 1/0 to true/false
    }));
}

async function purchaseSkin(userId, skinId) {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // Check if the user already owns the skin
        const [ownershipRows] = await connection.query(
            `SELECT * FROM user_skin WHERE user_id = ? AND skin_id = ?`,
            [userId, skinId]
        );
        if (ownershipRows.length > 0) {
            throw new Error('User already owns this skin');
        }

        // Get the skin price and user balance
        const [[skin]] = await connection.query(
            `SELECT rarities.price AS skin_price FROM skins 
             JOIN rarities ON skins.rarity_id = rarities.id WHERE skins.id = ?`,
            [skinId]
        );
        const [[user]] = await connection.query(
            `SELECT balance FROM users WHERE id = ?`,
            [userId]
        );

        if (!skin || !user) {
            throw new Error('Skin or user not found');
        }

        if (user.balance < skin.skin_price) {
            throw new Error('Insufficient balance');
        }

        // Deduct the price from the user's balance
        await connection.query(
            `UPDATE users SET balance = balance - ? WHERE id = ?`,
            [skin.skin_price, userId]
        );

        // Mark the skin as owned by the user
        await connection.query(
            `INSERT INTO user_skin (user_id, skin_id) VALUES (?, ?)`,
            [userId, skinId]
        );

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = {
    getAllSkinsWithOwnership,
    purchaseSkin,
};

