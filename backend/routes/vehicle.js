const express = require("express");
const clientController = require("../controllers/vehicle");
const validate = require("../middleware/validate");

const router = express.Router();

router
    .get("/", clientController.getAll)
    .get("/:id", clientController.getSingle)
    .post("/", validate.saveVehicle, clientController.createVehicle)
    .put("/:id", validate.saveVehicle, clientController.updateVehicle)
    .delete("/:id", clientController.deleteVehicle)

module.exports = router;