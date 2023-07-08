const express = require("express");
const router = express.Router();
const employeeController = require("../../controllers/employeeController");
const ROLES_LIST = require("../../config/userRolesList");
const verifyRoles = require("../../middleware/verifyRoles");

const data = {};
data.employees = require("../../model/employees.json")

router.route('/')
    .get(employeeController.getEmployees)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeeController.addNewEmployee)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeeController.updateEmployeeById)
    .delete(verifyRoles(ROLES_LIST.Admin), employeeController.deleteEmployeeById)

router.route("/:id")
    .get(employeeController.getEmployeeById);

module.exports = router;