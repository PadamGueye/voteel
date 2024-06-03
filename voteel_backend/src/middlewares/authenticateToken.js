const jwt = require("jsonwebtoken");
const db = require("../models/db.model");
const User = db.user;


const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const accessToken = authHeader.split(' ')[1];
        if (accessToken) {
        try {
            const { userId, exp } = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            if (exp < Date.now().valueOf() / 1000) {
                return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one !" });
            }
            res.locals.loggedInUser = await User.findByPk(userId);
        } catch (error) {
            return res.status(401).json({ error: "Invalid token, please login again !" });
        }
    }}
    next();
};

module.exports = authenticateToken;
