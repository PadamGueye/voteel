const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const grantAccess = require("../grantAccess/userAccess");
const allowIfLoggedin = require("../middlewares/allowIfLoggedIn");
const {defineUserRoles} = require("../roles/userRoles");

router.post('/login', userController.login);
router.post('/verify', userController.verifyUserAuthentification);
router.get('/:userId', allowIfLoggedin,grantAccess(defineUserRoles,['readAny','readOwn'], 'profile'), userController.getUser);
router.post('/signup', userController.signup);
router.post('/sendLink', allowIfLoggedin,grantAccess(defineUserRoles,['createAny'], 'link') , userController.sendLink);
router.get('/', allowIfLoggedin, grantAccess(defineUserRoles,['readAny'], 'profile'), userController.getUsers);
router.put('/:userId', allowIfLoggedin, grantAccess(defineUserRoles, ['updateAny','updateOwn'], 'profile'), userController.updateUser);
router.delete('/:userId', allowIfLoggedin, grantAccess(defineUserRoles,['deleteAny'], 'profile'), userController.deleteUser);


module.exports = router;