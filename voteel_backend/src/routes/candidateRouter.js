const express = require("express");
const router = express.Router();
const candidateController = require('../controllers/candidate.controller');
const allowIfLoggedin = require ("../middlewares/allowIfLoggedIn")
const grantAccess = require("../grantAccess/userAccess");
const {defineCandidateRoles} = require("../roles/candidateRole");
const upload = require("../middlewares/multer-config");

router.post("/", allowIfLoggedin, grantAccess(defineCandidateRoles, "createAny", "candidate") , upload, candidateController.addCandidate);
router.get("/", candidateController.getCandidates);
router.get("/:id", allowIfLoggedin, grantAccess(defineCandidateRoles, "readAny", "candidate") ,candidateController.getCandidate);
router.put("/:id", allowIfLoggedin, grantAccess(defineCandidateRoles, "updateAny", "candidate"), candidateController.updateCandidate);
router.delete("/:id", allowIfLoggedin, grantAccess(defineCandidateRoles, "deleteAny", "candidate"), candidateController.deleteCandidate);


module.exports = router;