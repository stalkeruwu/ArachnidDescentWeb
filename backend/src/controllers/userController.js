const { getAllSkinsWithOwnership } = require('../models/skinModel');
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

module.exports = {
    getUserSkins,
    getUserDetails, // Exporting the new function
};