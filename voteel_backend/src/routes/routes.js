const verifyToken = require('../middleware/authMiddleware');
const Candidate = require("../controllers/candidate.controller");
const User = require("../controllers/user.controller");
const Elector = require("../controllers/elector.controller");
const Position = require("../controllers/position.controller");

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

     app.route("/candidate")
     .get(Candidate.findAll)
     .post(Candidate.add)

     app.route('/candidate/:id')
     .get( Candidate.findOne)
     .put(Candidate.update)
     .delete(Candidate.delete);

     app.route("/elector")
     .get(Elector.findAll)
     .post(Elector.add)

     app.route('/elector/:id')
     .get( Elector.findOne)
     .put(Elector.update)
     .delete(Elector.delete);

     app.route("/position")
     .get(Position.findAll)
     .post(Position.add)

     app.route('/position/:id')
     .get( Position.findOne)
     .put(Position.update)
     .delete(Position.delete);
};

