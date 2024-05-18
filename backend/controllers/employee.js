const mongo = require("../db/lasso");
const ObjectId = require("mongodb").ObjectId;



const getAll = async (req, res) => {
    const result = await mongo.lassoDb().db().collection("sj_employees").find();
    if (result) {
        result.toArray().then((employees) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(employees);
        });
    } else {
        //Temporary.
        res.status(500).json(response.error || "An error has occurred while attempting to get all employees.");
    };
};


const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid employee ID.")
    }
    const empId = ObjectId.createFromHexString(req.params.id);
    mongo.lassoDb().db().collection("sj_employees").find({ _id: empId }).toArray((error, result) => {
        if (error) {
            res.status(400).json({ message: error});
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result[0]);
    });
};


const createEmployee = async (req, res) => {
    const employee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        role: req.body.role,
        company: req.body.company
    };
    const response = await mongo.lassoDb().db().collection("sj_employees").insertOne(employee);
    if (response) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occurred while attempting to create a new employee..!");
    }
};


const updateEmployee = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid employee ID.")
    }
    const empId = ObjectId.createFromHexString(req.params.id);
    const employee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        role: req.body.role,
        company: req.body.company
    };
    const response = await mongo.lassoDb().db().collection("sj_employees").replaceOne({ _id: empId }, employee);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occurred while attempting to update the employee..!");
    }
};


const deleteEmployee = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid employee ID")
    }
    const empId = ObjectId.createFromHexString(req.params.id);
    const response = await mongo.lassoDb().db().collection("sj_employees").deleteOne({ _id: empId });
    if (response) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occurred while attempting to delete the employee..!");
    }
};


module.exports = {
    getAll,
    getSingle,
    createEmployee,
    updateEmployee,
    deleteEmployee
};