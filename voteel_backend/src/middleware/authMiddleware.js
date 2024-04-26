const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied. Token missing or invalid.', status:401 });
    }

    const tokenString = token.split(' ')[1]; 
    try {
        const decoded = jwt.verify(tokenString, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        
        return res.status(401).json({ error: 'Invalid token',status:401 });
    }
}

module.exports = verifyToken;
