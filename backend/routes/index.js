const routes = require("express").Router();
const clientRoute = require("./client");
const sTicketRoute = require("./serviceticket");

routes.use("/", require("./swagger"))
routes.use("/client", clientRoute)
routes.use("/ticket", sTicketRoute);
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