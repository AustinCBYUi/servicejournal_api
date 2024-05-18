const routes = require("express").Router();
const clientRoute = require("./client");
const sTicketRoute = require("./serviceticket");
const employeeRoute = require("./employee");
const vehicleRoute = require("./vehicle");

routes.use("/", require("./swagger"))
routes.use("/client", clientRoute)
routes.use("/ticket", sTicketRoute)
routes.use("/employee", employeeRoute)
routes.use("/vehicle", vehicleRoute);
routes.use(
    "/",
    (docData = (req, res) => {
        let docData = {
            documentation: "UPDATE ME!",
        };
        res.send(docData);
    })
);

module.exports = routes;