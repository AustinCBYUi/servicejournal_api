const express = require("express");
const bodyParse = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const mongo = require("./db/lasso");
const clientRoute = require("./routes/client");
//Not yet implemented, commented out to run server. vvv
const ticketRoute = require("./routes/serviceticket");
const swagger = require("swagger-autogen");
const swaggerUI = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");

const port = process.env.PORT || 3030;
const api = express();

api
    .use(bodyParse.json())
    .use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc))
    .use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        next();
    })
    .use("/client", clientRoute)
    .use("/serviceticket", ticketRoute);

mongo.initializeDb((error) => {
    if (error) {
        console.log(error);
    } else {
        api.listen(port);
        console.log(`The server is running, and it is connected to database at port ${port}.`);
    }
});