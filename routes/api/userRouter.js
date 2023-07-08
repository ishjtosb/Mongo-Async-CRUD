const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const ROLES_LIST = require("../../config/userRolesList");
const verifyRoles = require("../../middleware/verifyRoles");

router.route("/")
    .get(verifyRoles(ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin), userController.getAllUsers)
    .put(verifyRoles(ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin), userController.updateUsernamePassword)
    .delete(verifyRoles(ROLES_LIST.Admin), userController.deleteUser)

module.exports = router;