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

module.exports = {
    getAllSkinsWithOwnership,
};

