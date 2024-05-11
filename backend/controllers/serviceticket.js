const mongo = require("../db/lasso");
const ObjectId = require("mongodb").ObjectId


const getAll = async (req, res) => {
    const result = await mongo.lassoDb().db().collection("sj_tickets").find();
    if (result) {
        result.toArray().then((tickets) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(tickets);
        });
    } else {
        res.status(500).json(response.error || "An error has occurred while attempting to retrieve service tickets.");
    };
};


const getSingle = async (req, res) => {
    const ticketId = ObjectId.createFromHexString(req.params.id);
    const result = await mongo.lassoDb().db().collection("sj_tickets").find({ _id: ticketId });
    if (result) {
        result.toArray().then((tickets) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(tickets[0]);
        });
    } else if (ticketId != result.ticketId) {
        res.status(501).json(response.error || `The service ticket by ${ticketId} was not found!`)
    } else {
        res.status(500).json(response.error || "An error has occurred while attempting to retrieve a single service ticket.");
    };
};


const createTicket = async (req, res) => {
    const ticket = {
        clientId: req.body.clientId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        tickets: [
            {
                title: req.body.title,
                price: req.body.price,
                date: req.body.date,
                mileage: req.body.mileage,
                desc: req.body.desc
            }
        ]
    };
    const response = await mongo.lassoDb().db().collection("sj_tickets").insertOne(ticket);
    if (response) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occurred while attempting to create a new service ticket.");
    }
};


const updateTicket = async (req, res) => {
    const ticketId = ObjectId.createFromHexString(req.params.id);
    const ticket = {
        clientId: req.body.clientId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        tickets: [
            {
                title: req.body.title,
                price: req.body.price,
                date: req.body.date,
                mileage: req.body.mileage,
                desc: req.body.desc
            }
        ]
    };
    const response = await mongo.lassoDb().db().collection("sj_tickets").replaceOne({ _id: ticketId }, ticket);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || `An error occurred while attempting to update ${response.firstName}'s service ticket.`);
    }
};


const deleteTicket = async (req, res) => {
    const ticketId = ObjectId.createFromHexString(req.params.id);
    const response = await mongo.lassoDb().db().collection("sj_tickets").deleteOne({ _id: ticketId });
    if (response) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || `An error occurred while attempting to delete ${response.firstName}'s service ticket.`);
    }
};


module.exports = {
    getAll,
    getSingle,
    createTicket,
    updateTicket,
    deleteTicket
};