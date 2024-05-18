const express = require("express");
const bodyParse = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const mongo = require("./db/lasso");

//Routes\\
const clientRoute = require("./routes/client");
const ticketRoute = require("./routes/serviceticket");
const employeeRoute = require("./routes/employee");
const vehicleRoute = require("./routes/vehicle");

//Swagger Autogen stuff for Documentation\\
const swagger = require("swagger-autogen");
const swaggerUI = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");

//Authentication Stuff using Auth0
const { auth, requiresAuth } = require("express-openid-connect");
require("dotenv").config();


const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
};


const port = process.env.PORT || 3030;
const api = express();


// mongoose.connect(process.env.DB_CONN,
//     { useNewUrlParser: true }, (error, res) => {
//         if (error) {
//             console.log("Connection failed: " + error);
//         } else {
//             console.log("Connected to Database.");
//         }
//     }
// );



api
    .use(auth(config))
    .use(bodyParse.json())
    .use("/api-docs", requiresAuth(), swaggerUI.serve, swaggerUI.setup(swaggerDoc))
    .use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        next();
    })
    .use("/client", requiresAuth(), clientRoute)
    .use("/ticket", requiresAuth(), ticketRoute)
    .use("/employee", requiresAuth(), employeeRoute)
    .use("/vehicle", requiresAuth(), vehicleRoute)



//Get request always needs to be after the use ^
api.get("/", (req, res) => {
    res.send(req.oidc.isAuthenticated() ? `Logged in as ${req.oidc.user}` : "Logged out");
});
api.get("/profile", requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});


//Testing
process.on("uncaughtException", (error, origin) => {
    console.log(process.stderr.fd, `Caught error at -> ${error}\n` + `Error Origin -> ${origin}`);
});


mongo.initializeDb((error) => {
    if (error) {
        console.log(error);
    } else {
        api.listen(port);
        console.log(`The server is running, and it is connected to database at port ${port}.`);
    }
});