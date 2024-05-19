const allowIfLoggedin = (req, res, next) => {
    try{
        console.log("allowIfLoggedin:");
        // console.log("res.locals:",res.locals);
        const user = res.locals.loggedInUser;
        // console.log("user:",user);
        if(!user)
            return res.status(401).json({
                error: "You need to be logged in to access this route !"
            });
        req.user = user;
        next();
    } catch (e) {
        next(e);
    }
}

module.exports = allowIfLoggedin;