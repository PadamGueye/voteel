const express = require("express");
const router = express.Router();
const electorController = require('../controllers/elector.controller');
const allowIfLoggedin = require ("../middlewares/allowIfLoggedIn")
const grantAccess = require("../grantAccess/userAccess");
const {defineElectorRoles} = require("../roles/electorRole");

router.post("/", allowIfLoggedin, grantAccess(defineElectorRoles, "createAny", "elector") , electorController.addElector);
router.get("/", allowIfLoggedin , grantAccess(defineElectorRoles, "readAny", "elector") ,electorController.getElectors);
router.get("/:electorId", allowIfLoggedin, grantAccess(defineElectorRoles, "readAny", "elector") ,electorController.getElector);
router.put("/:electorId", allowIfLoggedin, grantAccess(defineElectorRoles, "updateAny", "elector"), electorController.updateElector);
router.delete("/:electorId", allowIfLoggedin, grantAccess(defineElectorRoles, "deleteAny", "elector"), electorController.deleteElector);


module.exports = router;