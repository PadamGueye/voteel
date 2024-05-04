const verifyToken = require('../middleware/authMiddleware');
const Candidate = require("../controllers/candidate.controller");
const User = require("../controllers/user.controller");
const Elector = require("../controllers/elector.controller");
const Election = require("../controllers/election.controller");
const Position = require("../controllers/position.controller");
const Vote = require("../controllers/vote.controller");
const Token = require("../controllers/token.controller");

module.exports = app => {
  app.route("/user")
    .get(User.findAll)
    .post(User.create)

    app.route("/sendLink")
    .post(User.sendLink)

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


     app.route("/election")
     .get(Election.findAll)
     .post(Election.addElection)

     app.route("/completedElections")
     .get(Election.findCompletedElections)

     app.route("/currentElections")
     .get(Election.findCurrentElections)

     app.route("/pendingElections")
     .get(Election.findPendingElections)

     app.route('/election/:id')
     .get( Election.findOne)
     .put(Election.update)
     .delete(Election.delete);

     app.route("/vote")
     .get(Vote.findAll)
     .post(Vote.saveVote)

     app.route("/token")
     .post(Token.saveToken)
};

