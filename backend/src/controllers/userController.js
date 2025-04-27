const { getAllSkinsWithOwnership, purchaseSkin } = require('../models/skinModel');
const { getUserBalanceAndName } = require('../models/userModel');

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

async function getUserDetails(req, res) {
    const userId = req.user.id; // Assuming user ID is available in the request object after authentication

    try {
        const user = await getUserBalanceAndName(userId); // Fetch user details using the user model
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Error fetching user details' });
    }
}

async function buySkin(req, res) {
    const userId = req.user.id; // Assuming user ID is available in the request object after authentication
    const { skinId } = req.body;

    try {
        await purchaseSkin(userId, skinId);
        res.status(200).json({ message: 'Skin purchased successfully' });
    } catch (error) {
        console.error('Error purchasing skin:', error);
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getUserSkins,
    getUserDetails,
    buySkin, // Exporting the new function
};