const bcrypt = require('bcrypt');
const { getAllSkinsWithOwnership, purchaseSkin } = require('../models/skinModel');
const { getUserBalanceAndName, updateUserEmail, getUserById, updatePassword, getUserByEmail, updateUserVerificationToken, changeUserBalance } = require('../models/userModel');
const { sendVerificationEmail } = require('./authController');
const crypto = require('crypto');

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

async function updateEmail(req, res) {
    const userId = req.user.id; // Extract user ID from the authenticated request
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        // Fetch the user's current email
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the new email matches the current email
        if (user.email === email) {
            return res.status(400).json({ error: 'The new email cannot be the same as your current email.' });
        }

        // Check if the email already exists in the database
        const existingUser = await getUserByEmail(email);
        if (existingUser && existingUser.id !== userId) {
            return res.status(400).json({ error: 'Email is already in use by another account.' });
        }

        // Generate a new verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        await updateUserVerificationToken(userId, verificationToken);

        // Send a verification email to the new email address
        const verificationUrl = `https://arachnid-descent.games/verify-email.html?token=${verificationToken}`;
        await sendVerificationEmail(email, verificationUrl);

        // Update the email in the database
        await updateUserEmail(userId, email);

        res.status(200).json({ message: 'Email updated successfully. Please verify your new email address.' });
    } catch (error) {
        console.error('Error updating email:', error);
        res.status(500).json({ error: 'Error updating email' });
    }
}

async function updateUserPassword(req, res) {
    const userId = req.user.id; // Extract user ID from the authenticated request
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Current and new passwords are required' });
    }

    try {
        const user = await getUserById(userId);

        // Verify the current password
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password in the database
        await updatePassword(userId, hashedPassword);

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Error updating password' });
    }
}

async function changeBalance(req, res) {
    const userId = req.user.id; // Assuming user ID is extracted from the authenticated request
    const { amount } = req.body;

    if (typeof amount !== 'number') {
        return res.status(400).json({ error: 'Amount must be a number' });
    }

    try {
        await changeUserBalance(userId, amount);
        res.status(200).json({ message: 'Balance updated successfully' });
    } catch (error) {
        console.error('Error updating balance:', error);
        res.status(500).json({ error: 'Error updating balance' });
    }
}


module.exports = {
    getUserSkins,
    getUserDetails,
    buySkin, // Exporting the new function
    updateEmail,
    updateUserPassword,
    changeBalance,
};