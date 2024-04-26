const verifyToken = require('../middleware/authMiddleware');
const User = require("../controllers/user.controller");

module.exports = app => {
  app.route("/user")
    .get(User.findAll)
    .post(User.create)

    app.route('/user/:id')
        .get(verifyToken, User.findOne)
        .put(User.update)
        .delete(User.delete);

     app.route('/login')
     .post(User.authenticateUser) 

};

