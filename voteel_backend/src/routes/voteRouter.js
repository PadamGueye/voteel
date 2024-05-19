const express = require("express");
const router = express.Router();
const voteController = require('../controllers/vote.controller');
const allowIfLoggedin = require ("../middlewares/allowIfLoggedIn")
const grantAccess = require("../grantAccess/userAccess");
const {defineVoteRoles} = require("../roles/voteRole");

router.post("/", allowIfLoggedin, grantAccess(defineVoteRoles, "createAny", "vote") , voteController.saveVote);
router.get("/", allowIfLoggedin , grantAccess(defineVoteRoles, "readAny", "vote") ,voteController.getVotes);


module.exports = router;