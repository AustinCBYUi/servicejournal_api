const express = require("express");
const clientController = require("../controllers/client");

const router = express.Router();

router
    .get("/", clientController.getAll)
    .get("/:id", clientController.getSingle)
    .post("/", clientController.createClient)
    .put("/:id", clientController.updateClient)
    .delete("/:id", clientController.deleteClient)

module.exports = router;