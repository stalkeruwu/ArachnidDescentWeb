const { getUserSkins } = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware'); // Assuming authentication middleware exists

async function userRoutes(req, res) {
    if (req.method === 'GET' && req.url.startsWith('/api/user/skins')) {
        // Apply authentication middleware
        await authenticate(req, res);

        if (!req.user) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Unauthorized' }));
            return;
        }

        await getUserSkins(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
}

module.exports = userRoutes;