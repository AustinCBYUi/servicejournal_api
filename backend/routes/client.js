const express = require("express");
const clientController = require("../controllers/client");

const router = express.Router();

router.get("/", clientController.getAll)
router.get("/:id", clientController.getSingle)
router.post("/", clientController.createClient)
router.put("/:id", clientController.updateClient)
router.delete("/:id", clientController.deleteClient)

module.exports = router;