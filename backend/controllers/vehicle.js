const mongo = require("../db/lasso");
const ObjectId = require("mongodb").ObjectId;



const getAll = async (req, res) => {
    const result = await mongo.lassoDb().db().collection("sj_vehicles").find();
    if (result) {
        result.toArray().then((vehicles) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(vehicles);
        });
    } else {
        //Temporary.
        res.status(500).json(response.error || "An error has occurred while attempting to get all client vehicles.");
    };
};


const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid client ID to find a client and vehicle.")
    }
    const vehId = ObjectId.createFromHexString(req.params.id);
    mongo.lassoDb().db().collection("sj_clients").find({ _id: vehId }).toArray((error, result) => {
        if (error) {
            res.status(400).json({ message: error});
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result[0]);
    });
};


const createVehicle = async (req, res) => {
    const vehicle = {
        clientId: req.body.clientId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        vehicles: [
            {
                year: req.body.year,
                make: req.body.make,
                model: req.body.model,
                trim: req.body.trim,
                motor: req.body.motor
            }
        ]
    };
    const response = await mongo.lassoDb().db().collection("sj_vehicles").insertOne(vehicle);
    if (response) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occurred while attempting to create a new client vehicle..!");
    }
};


const updateVehicle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid client ID to find a client vehicle.")
    }
    const vehId = ObjectId.createFromHexString(req.params.id);
    const vehicle = {
        clientId: req.body.clientId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        vehicles: [
            {
                year: req.body.year,
                make: req.body.make,
                model: req.body.model,
                trim: req.body.trim,
                motor: req.body.motor
            }
        ]
    };
    const response = await mongo.lassoDb().db().collection("sj_vehicles").replaceOne({ _id: vehId }, vehicle);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occurred while attempting to update the client vehicle..!");
    }
};


const deleteVehicle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid client ID to find a client vehicle.")
    }
    const vehId = ObjectId.createFromHexString(req.params.id);
    const response = await mongo.lassoDb().db().collection("sj_vehicles").deleteOne({ _id: vehId });
    if (response) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occurred while attempting to delete the client vehicle..!");
    }
};


module.exports = {
    getAll,
    getSingle,
    createVehicle,
    updateVehicle,
    deleteVehicle
};