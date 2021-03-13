// Clients, Suppliers, Manufacturers and Parts Tables get and set

const database = require("./database.js"); // Database Functions
const { ObjectID } = require('mongodb'); // MongoDB Object ID

// Get All Clients
const getAllClients = async (userID) => {
    const result = new Promise((res, rej) => {
        database.connectAndGetDatabaseObject().then((db) => {
            db.collection("Clients").find({ "_uid": userID }).toArray((err, documents) => {
                if (err) {
                    console.log("Can't Retrieve Client Collection !");
                    throw err;
                }
                else {
                    res(documents);
                }
            });
        });
    });
    return result;
}

// Get All Suppliers
const getAllSuppliers = async (userID) => {
    const result = new Promise((res, rej) => {
        database.connectAndGetDatabaseObject().then((db) => {
            db.collection("Suppliers").find({ "_uid": userID }).toArray((err, documents) => {
                if (err) {
                    console.log("Can't Retrieve Suppliers Collection !");
                    throw err;
                }
                else {
                    res(documents);
                }
            });
        });
    });
    return result;
}

// Get All Manufacturers
const getAllManufacturers = async (userID) => {
    const result = new Promise((res, rej) => {
        database.connectAndGetDatabaseObject().then((db) => {
            db.collection("Manufacturers").find({ "_uid": userID }).toArray((err, documents) => {
                if (err) {
                    console.log("Can't Retrieve Manufacturers Collection !");
                    throw err;
                }
                else {
                    res(documents);
                }
            });
        });
    });
    return result;
}

// Get All Parts
const getAllParts = async (userID, partType, supplierID) => {
    const result = new Promise((res, rej) => {
        database.connectAndGetDatabaseObject().then((db) => {
            db.collection(partType).find({ "_uid": userID, "_sid": supplierID }).toArray((err, documents) => {
                if (err) {
                    console.log(`Can't Retrieve ${partType} Collection !`);
                    throw err;
                }
                else {
                    res(documents);
                }
            });
        });
    });
    return result;
}

// Get All Orders
const getAllOrders = async (userID) => {
    const result = new Promise((res, rej) => {
        database.connectAndGetDatabaseObject().then((db) => {
            db.collection("Orders").find({ "_uid": userID }).toArray((err, documents) => {
                if (err) {
                    console.log("Can't Retrieve Orders Collection !");
                    throw err;
                }
                else {
                    res(documents);
                }
            });
        });
    });
    return result;
}

// exports functions out as a module
exports.getAllClients = getAllClients;
exports.getAllSuppliers = getAllSuppliers;
exports.getAllManufacturers = getAllManufacturers;
exports.getAllParts = getAllParts;
exports.getAllOrders = getAllOrders;








