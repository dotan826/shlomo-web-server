/*
    Database Connection Functions

    - Create Database Client Object
    - Connect to Client
    - Revive Lost Connection to Client
    - Get Database Object
    - 
*/

const databaseCluster = ""; // Database Cluster Name of the MongoDB Atlas
const databasePassword = ""; // Database Cluster Password of the MongoDB Atlas
const databaseName = ""; // Database Name in the MongoDB Atlas Cluster

const MongoClient = require('mongodb').MongoClient; // MongoClient instance
// "mongodb+srv://production-user-20:<password>@cluster0.ofydl.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority"
// Password = <password> [change it to the password of the user !]
// Default Database = <dbname> [change it to the name of the database we want to get by default !]
const url = `mongodb+srv://production-user-20:${databasePassword}@cluster0.ofydl.gcp.mongodb.net/${databaseCluster}?retryWrites=true&w=majority`;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

const mongoDatabase = {
    client: client, // Database Client
    db: null, // Database DB Object
}

//** TESTED ALREADY - READY FOR PRODUCTION */
// Connect to Database Server and save Client Connection
const connectAndGetDatabaseObject = async () => {
    const result = new Promise((res, rej) => {
        if (mongoDatabase.client.isConnected()) {
            res(mongoDatabase.db); // We are Already Connected to the Client !
        }
        else {
            mongoDatabase.client.connect((err, client) => {
                if (err) {
                    console.log("Client Connection has Failed !");
                    throw err;
                }
                else {
                    mongoDatabase.client = client;
                    mongoDatabase.db = client.db(databaseName);
                    res(mongoDatabase.db); // Client Connection has Established !
                }
            });
        }
    });
    return result; // return Database Object (NOT Client Object !!!)
}

//** TESTED ALREADY - READY FOR PRODUCTION */
// Get from database collection a specific document with a query
const readSpecificDocument = async (databaseObject, collectionName, query = {}) => {
    const result = new Promise((res, rej) => {
        databaseObject.collection(collectionName).findOne(query, (err, result) => {
            if (err){
                console.log("Read Document has Failed !");
                throw err;
            }
            else{
                res(result);
            }
        });
    });
    return result; // return Specific Document
}

//** TESTED ALREADY - READY FOR PRODUCTION */
// Insert to database collection a specific document
const insertSpecificDocument = async (databaseObject, collectionName, document) => {
    const result = new Promise((res, rej) => {
        databaseObject.collection(collectionName).insertOne(document, (err, result) => {
            if (err){
                console.log("Insert Document has Failed !");
                throw err;
            }
            else{
                res(result);
            }
        });
    });
    return result; // return result of the Insert Operation
}

//** TESTED ALREADY - READY FOR PRODUCTION */
// Delete from database collection a specific document
const deleteSpecificDocument = async (databaseObject, collectionName, query) => {
    const result = new Promise((res, rej) => {
        databaseObject.collection(collectionName).deleteOne(query, (err, result) => {
            if (err){
                console.log("Delete Document has Failed !");
                throw err;
            }
            else{
                res(result);
            }
        });
    });
    return result; // return result of the Delete Operation
}

//** TESTED ALREADY - READY FOR PRODUCTION */
// Delete from database collection many documents
const deleteManyDocuments = async (databaseObject, collectionName, query) => {
    const result = new Promise((res, rej) => {
        databaseObject.collection(collectionName).deleteMany(query, (err, result) => {
            if (err){
                console.log("Delete Documents has Failed !");
                throw err;
            }
            else{
                res(result);
            }
        });
    });
    return result; // return result of the Delete Operation
}

//** TESTED ALREADY - READY FOR PRODUCTION */
// Update a specific document in database collection
const updateSpecificDocument = async (databaseObject, collectionName, query, updatedDocument) => {
    const result = new Promise((res, rej) => {
        databaseObject.collection(collectionName).updateOne(query, updatedDocument, (err, result) => {
            if (err){
                console.log("Update Document has Failed !");
                throw err;
            }
            else{
                res(result);
            }
        });
    });
    return result; // return result of the Delete Operation
}

// exports functions out as a module
exports.connectAndGetDatabaseObject = connectAndGetDatabaseObject;

exports.readSpecificDocument = readSpecificDocument;
exports.insertSpecificDocument = insertSpecificDocument;
exports.deleteSpecificDocument = deleteSpecificDocument;
exports.updateSpecificDocument = updateSpecificDocument;

