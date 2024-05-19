const jwt = require("jsonwebtoken");
const db = require("../models/db.model");
const User = db.user;


const authenticateToken = async (req, res, next) => {
    console.log("authentificateToken:");
if (req.headers["x-access-token"]) {
        const accessToken = req.headers["x-access-token"];
        try {
            const { userId, exp } = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        console.log("userID:",userId);
            if (exp < Date.now().valueOf() / 1000) {
                return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one !" });
            }
            res.locals.loggedInUser = await User.findByPk(userId);
            // console.log("res.locals.loggedInUser:",res.locals.loggedInUser);
        } catch (error) {
            return res.status(401).json({ error: "Invalid token, please login again !" });
        }
    }
    next();
};

module.exports = authenticateToken;
