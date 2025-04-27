require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import CORS

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});