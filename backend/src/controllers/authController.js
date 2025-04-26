const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sgMail = require('../config/sendgridConfig');
const { createUser, getUserByEmail, updateUserVerificationToken, getUserByVerificationToken, markUserAsVerified, updateResetPasswordToken, getUserByResetToken, updatePassword } = require('../models/userModel');

async function registerUser(req, res) {
    const { username, email, password } = req.body;

    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await createUser(username, email, hashedPassword);

        // Generate a unique verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        await updateUserVerificationToken(userId, verificationToken);

        // Send verification email
        const verificationUrl = "http://localhost:5500/frontend/views/verify-email.html?token=" + verificationToken;
        await sendVerificationEmail(email, verificationUrl);

        res.status(201).json({ message: 'User registered successfully. Please check your email to verify your account.' });
    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
}

async function sendVerificationEmail(email, verificationUrl) {
    const msg = {
        to: email,
        from: 'noreply@arachnid-descent.games', // Replace with your verified SendGrid sender email
        subject: 'Verify Your Email - Arachnid Descent',
        html: `<p>Thank you for registering for Arachnid Descent!</p>
               <p>Please verify your email by clicking the link below:</p>
               <a href="${verificationUrl}">${verificationUrl}</a>`,
    };

    await sgMail.send(msg);
}

async function verifyEmail(req, res) {
    const { token } = req.query;

    try {
        const user = await getUserByVerificationToken(token);
        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        await markUserAsVerified(user.id);
        res.status(200).json({ message: 'Email verified successfully!' });
    } catch (error) {
        console.error('Error in verifyEmail:', error);
        res.status(500).json({ error: 'Error verifying email' });
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    console.log('Raw Request Body:', req.body);
    console.log('Request Body:', req.body);
    console.log('Request Headers:', req.headers);
    try {
        const user = await getUserByEmail(email);
        console.log('User:', user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.is_verified) {
            return res.status(403).json({ error: 'Please verify your email before logging in' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '5h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
}

async function forgotPassword(req, res) {
    const { email } = req.body;

    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const expiry = new Date(Date.now() + 3600000); // 1 hour from now

        await updateResetPasswordToken(user.id, resetToken, expiry);

        const resetUrl = `http://localhost:5500/frontend/views/reset-password.html?token=${resetToken}`;
        await sendResetPasswordEmail(user.email, resetUrl);

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        res.status(500).json({ error: 'Error processing request' });
    }
}

async function resetPassword(req, res) {
    const { token, newPassword } = req.body;

    try {
        const user = await getUserByResetToken(token);

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await updatePassword(user.id, hashedPassword);

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Error in resetPassword:', error);
        res.status(500).json({ error: 'Error resetting password' });
    }
}

async function sendResetPasswordEmail(email, resetUrl) {
    const msg = {
        to: email,
        from: 'noreply@arachnid-descent.games',
        subject: 'Reset Your Password - Arachnid Descent',
        html: `<p>You requested a password reset.</p>
               <p>Click the link below to reset your password:</p>
               <a href="${resetUrl}">${resetUrl}</a>`
    };

    await sgMail.send(msg);
}

async function checkTokenValidity(req, res) {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ error: 'Token is required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ message: 'Token is valid', user: decoded });
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
}

module.exports = { registerUser, loginUser, verifyEmail, forgotPassword, resetPassword, checkTokenValidity };