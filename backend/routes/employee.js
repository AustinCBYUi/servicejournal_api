const express = require("express");
const clientController = require("../controllers/employee");
const validate = require("../middleware/validate");

const router = express.Router();

router
    .get("/", clientController.getAll)
    .get("/:id", clientController.getSingle)
    .post("/", validate.saveEmployee, clientController.createEmployee)
    .put("/:id", validate.saveEmployee, clientController.updateEmployee)
    .delete("/:id", clientController.deleteEmployee)

module.exports = router;