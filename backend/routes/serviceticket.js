const express = require("express");
const sTicketController = require("../controllers/serviceticket");

const router = express.Router();

router
    .get("/", sTicketController.getAll)
    .get("/:id", sTicketController.getSingle)
    .post("/", sTicketController.createTicket)
    .put("/:id", sTicketController.updateTicket)
    .delete("/:id", sTicketController.deleteTicket)

    module.exports = router;