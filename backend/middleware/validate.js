const validator = require("../helper/validate");

const saveClient = (req, res, next) => {
    const validRules = {
        firstName: "required|string",
        lastName: "required|string",
        age: "required|integer",
        streetAddress: "required|string",
        unit: "integer",
        city: "required|string",
        state: "required|string",
        postalCode: "required|integer",
        type: "required|string",
        number: "required|integer"
    };
    validator(req.body, validRules, {}, (error, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: "Validation Failed.",
                data: error
            });
        } else {
            next();
        }
    });
};


const saveTicket = (req, res, next) => {
    const validRules = {
        clientId: "required|string",
        firstName: "required|string",
        lastName: "required|string",
        title: "string",
        price: "string",
        date: "date",
        mileage: "integer",
        desc: "string"
    };
    validator(req.body, validRules, {}, (error, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: "Validation Failed.",
                data: error
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveClient,
    saveTicket
}