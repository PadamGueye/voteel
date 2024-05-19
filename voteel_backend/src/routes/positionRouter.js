const express = require("express");
const router = express.Router();
const positionController = require('../controllers/position.controller');
const allowIfLoggedin = require ("../middlewares/allowIfLoggedIn")
const grantAccess = require("../grantAccess/userAccess");
const {definePositionRoles} = require("../roles/positionRole");

router.post("/", allowIfLoggedin, grantAccess(definePositionRoles, "createAny", "position") , positionController.addPosition);
router.get("/", allowIfLoggedin , grantAccess(definePositionRoles, "readAny", "position") , positionController.getPositions);
router.get("/:positionId", allowIfLoggedin, grantAccess(definePositionRoles, "readAny", "position") , positionController.getPosition);
router.put("/:positionId", allowIfLoggedin, grantAccess(definePositionRoles, "updateAny", "position"), positionController.updatePosition);
router.delete("/:positionId", allowIfLoggedin, grantAccess(definePositionRoles, "deleteAny", "position"), positionController.deletePosition);


module.exports = router;