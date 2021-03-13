// New and Exist Users Login

const database = require("./database.js"); // Database Functions

// Login Exist User
/*
    Blueprint of User Document :
    {
        fullName: ...
        email: ...
        password: ...
    }

    Parameters :
    userDetails = User Details Object like blueprint
    
    Return :
    If User Exist >>> document
    If User NOT Exist >>>> false
*/
const existUser = async (userDetails) => {
    const result = new Promise((res, rej) => {
        database.connectAndGetDatabaseObject().then((db) => {
            database.readSpecificDocument(db, "Users", { email: userDetails.email, password: userDetails.password }).then((document) => {
                if (document === null) {
                    res(false); // User Not Exist !
                }
                else {
                    res(document); // User Exist !
                }
            });
        });
    });
    return result;
}

// Login New User
/*
    Blueprint of User Document :
    {
        fullName: ...
        email: ...
        password: ...
    }

    Parameters :
    userDetails = User Details Object like blueprint
    
    Return :
    If User Exist >>> false
    If User NOT Exist >>>> document
*/
const newUser = async (userDetails) => {
    const result = new Promise((res, rej) => {
        database.connectAndGetDatabaseObject().then((db) => {
            existUser(userDetails).then((checkIfUserExist) => {
                if (checkIfUserExist) {
                    res(false); // User Already Exist
                }
                else {
                    database.insertSpecificDocument(db, "Users", userDetails).then((insertResult) => {
                        res(insertResult.ops[0]); // User has been Created !
                    });
                }
            });
        });
    });
    return result;
}

// exports functions out as a module
exports.existUser = existUser;
exports.newUser = newUser;












