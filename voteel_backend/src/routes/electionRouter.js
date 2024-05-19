const express = require("express");
const router = express.Router();
const electionController = require('../controllers/election.controller');
const allowIfLoggedin = require ("../middlewares/allowIfLoggedIn")
const grantAccess = require("../grantAccess/userAccess");
const {defineElectionRoles} = require("../roles/electionRole");

router.post("/", allowIfLoggedin, grantAccess(defineElectionRoles, "createAny", "election") , electionController.createElection);
router.get("/", allowIfLoggedin , grantAccess(defineElectionRoles, "readAny", "election") ,electionController.getElections);
router.get("/completedElections", allowIfLoggedin, grantAccess(defineElectionRoles, "readAny", "election"), electionController.getCompletedElections);
router.get("/currentElections", allowIfLoggedin, grantAccess(defineElectionRoles, "readAny", "election"), electionController.getCurrentElections);
router.get("/pendingElections", allowIfLoggedin, grantAccess(defineElectionRoles, "readAny", "election"), electionController.getPendingElections);
router.get("/start", electionController.startElection);
router.get("/:electionId", allowIfLoggedin, grantAccess(defineElectionRoles, "readAny", "election") ,electionController.getElection);
router.put("/:electionId", allowIfLoggedin, grantAccess(defineElectionRoles, "updateAny", "election"), electionController.updateElection);
router.delete("/:electionId", allowIfLoggedin, grantAccess(defineElectionRoles, "deleteAny", "election"), electionController.deleteElection);


module.exports = router;