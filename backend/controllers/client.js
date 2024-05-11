const mongo = require("../db/lasso");
const ObjectId = require("mongodb").ObjectId;



const getAll = async (req, res) => {
    const result = await mongo.lassoDb().db().collection("sj_clients").find();
    if (result) {
        result.toArray().then((clients) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(clients);
        });
    } else {
        //Temporary.
        res.status(500).json(response.error || "An error has occurred while attempting to get all clients.");
    };
};


const getSingle = async (req, res) => {
    const clientId = ObjectId.createFromHexString(req.params.id);
    const result = await mongo.lassoDb().db().collection("sj_clients").find({ _id: clientId });
    if (result) {
        result.toArray().then((clients) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(clients[0]);
        });
    } else if (clientId != result.clientId) {
        res.status(501).json(response.error || `The client ID ${clientId} does not appear to exist.`);
    } else {
        res.status(500).json(response.error || "An error has occurred while attempting to get a single client.");
    };
};


const createClient = async (req, res) => {
    const client = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        address: {
            streetAddress: req.body.streetAddress,
            unit: req.body.unit,
            city: req.body.city,
            state: req.body.state,
            postalCode: req.body.postalCode
        },
        phoneNumber: 
        [
            {
                type: req.body.type,
                number: req.body.number
            }
        ]
    };
    const response = await mongo.lassoDb().db().collection("sj_clients").insertOne(client);
    if (response) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occurred while attempting to create a new client..!");
    }
};


const updateClient = async (req, res) => {
    const clientId = ObjectId.createFromHexString(req.params.id);
    const client = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        address: [
            {
                streetAddress: req.body.streetAddress,
                unit: req.body.unit,
                city: req.body.city,
                state: req.body.state,
                postalCode: req.body.postalCode
            }
        ],
        phoneNumber: [
            {
                type: req.body.type,
                number: req.body.number
            }
        ]
    };
    const response = await mongo.lassoDb().db().collection("sj_clients").replaceOne({ _id: clientId }, client);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occurred while attempting to update the client..!");
    }
};


const deleteClient = async (req, res) => {
    const clientId = ObjectId.createFromHexString(req.params.id);
    const response = await mongo.lassoDb().db().collection("sj_clients").deleteOne({ _id: clientId });
    if (response) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occurred while attempting to delete the client..!");
    }
};


module.exports = {
    getAll,
    getSingle,
    createClient,
    updateClient,
    deleteClient
};