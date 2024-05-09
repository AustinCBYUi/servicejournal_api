const environment = require("dotenv");
environment.config();
const MongoClient = require("mongodb").MongoClient;

let _db;

const initializeDb = (callback) => {
    if (_db) {
        console.log("Database has already been initialized");
        return callback(null, _db);
    }
    MongoClient.connect(process.env.DB_CONN)
    .then((client) => {
        _db = client;
        callback(null, _db);
    })
    .catch((error) => {
        callback(error);
    });
};

const lassoDb = () => {
    if (!_db) {
        throw Error("Database is not initialized or had an error..");
    }
    return _db;
};

module.exports = { initializeDb, lassoDb }
