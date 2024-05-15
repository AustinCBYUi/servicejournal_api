const express = require("express");
const sTicketController = require("../controllers/serviceticket");
const validate = require("../middleware/validate");

const router = express.Router();

router
    .get("/", sTicketController.getAll)
    .get("/:id", sTicketController.getSingle)
    .post("/", validate.saveTicket, sTicketController.createTicket)
    .put("/:id", validate.saveTicket, sTicketController.updateTicket)
    .delete("/:id", sTicketController.deleteTicket)

    module.exports = router;