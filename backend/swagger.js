const swagger = require("swagger-autogen")();

const doc = {
    info: {
        title: "Service Journal API",
        description: "An application program interface to manage data for the service journal application.",
    },
    host: "localhost:3030",
    schemes: ["https", "http"],
};

const out = "./swagger.json";
const endpoints = ["./routes/index.js"];

swagger(out, endpoints, doc).then(async () => {
    await import("./index.js");
});