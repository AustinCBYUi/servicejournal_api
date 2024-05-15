const express = require("express");
const clientController = require("../controllers/client");
const validate = require("../middleware/validate");

const router = express.Router();

router
    .get("/", clientController.getAll)
    .get("/:id", clientController.getSingle)
    .post("/", validate.saveClient, clientController.createClient)
    .put("/:id", validate.saveClient, clientController.updateClient)
    .delete("/:id", clientController.deleteClient)

module.exports = router;