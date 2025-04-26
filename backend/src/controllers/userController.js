const { getAllSkinsWithOwnership } = require('../models/skinModel');

async function getUserSkins(req, res) {
    const userId = req.user.id; // Assuming user ID is available in the request object after authentication

    try {
        const skins = await getAllSkinsWithOwnership(userId);
        res.status(200).json(skins);
    } catch (error) {
        console.error('Error fetching user skins:', error);
        res.status(500).json({ error: 'Error fetching user skins' });
    }
}

module.exports = {
    getUserSkins,
};