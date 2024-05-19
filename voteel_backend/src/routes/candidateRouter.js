const express = require("express");
const router = express.Router();
const candidateController = require('../controllers/candidate.controller');
const allowIfLoggedin = require ("../middlewares/allowIfLoggedIn")
const grantAccess = require("../grantAccess/userAccess");
const {defineCandidateRoles} = require("../roles/candidateRole");

router.post("/", allowIfLoggedin, grantAccess(defineCandidateRoles, "createAny", "candidate") , candidateController.addCandidate);
router.get("/", allowIfLoggedin , grantAccess(defineCandidateRoles, "readAny", "candidate") ,candidateController.getCandidates);
router.get("/:candidateId", allowIfLoggedin, grantAccess(defineCandidateRoles, "readAny", "candidate") ,candidateController.getCandidate);
router.put("/:candidateId", allowIfLoggedin, grantAccess(defineCandidateRoles, "updateAny", "candidate"), candidateController.updateCandidate);
router.delete("/:candidateId", allowIfLoggedin, grantAccess(defineCandidateRoles, "deleteAny", "candidate"), candidateController.deleteCandidate);


module.exports = router;