const express = require('express');
const app = express();
const port = process.env.PORT || 3080;
const path = require("path"); // for path methods
const database = require("./components/database.js"); // Database Functions
const login = require('./components/login.js'); // Login Functions
const csmpTables = require('./components/csmpTables.js'); // Clients, Suppliers, Manufacturers and Parts Tables Functions


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ DEVELOPMENT ONLY
const cors = require("cors"); // FOR TESTING / DEVELOPMENT !
const corsOptions = { // FOR TESTING / DEVELOPMENT !
  origin: 'http://localhost:3000'
}
app.use(cors(corsOptions)); // FOR TESTING / DEVELOPMENT !
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ DEVELOPMENT ONLY

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Check if the request made from Secure (HTTPS) url - if not, it redirect the client browser to HTTPS !
app.use(function (req, resp, next) {
  if (req.headers['x-forwarded-proto'] == 'http') {
    return resp.redirect(301, 'https://' + req.headers.host + '/');
  } else {
    return next();
  }
});

// Add this line after we have the build ----->>>>>
// app.use(express.static(path.join(__dirname, "build")));

// Testing ---->>>>
const start = async () => {
  //await database.connectAndGetDatabaseObject().then((res)=>{
  //console.log(res); // print client object
  // database.readSpecificDocument(res, "Users", {}).then((res)=>{
  //   console.log(res);
  // });
  // database.deleteSpecificDocument(res, "Users", { email: "What?" }).then((res)=>{
  //   console.log(res);
  // });

  //});
  // await login.existUser({ fullname: "test1", email: "test7", password: "test3" }).then((res)=>{
  //   console.log(res);
  // });
  // await login.newUser({ fullname: "test1", email: "test7", password: "test3" }).then((res)=>{
  //   console.log(res);
  // });
  // await csmpTables.getAllClients("5fa6cd9a97dfa80120ae9f6b").then((documents) => {
  //   console.log(documents);
  // });
}
start();
// Testing ---->>>>

// New User Login
app.post("/newUser", (req, res) => {
  login.newUser(req.body).then((document) => {
    res.send(document); // return False or Document
  });
});

// Exist User Login
app.post("/existUser", (req, res) => {
  login.existUser(req.body).then((document) => {
    res.send(document); // return False or Document
  });
});

// Get All Documents From Clients Table (for specific user)
app.post("/clients", (req, res) => {
  csmpTables.getAllClients(req.body.userID).then((documents) => {
    res.send(documents);
  });
});

// Get All Documents From Suppliers Table (for specific user)
app.post("/suppliers", (req, res) => {
  csmpTables.getAllSuppliers(req.body.userID).then((documents) => {
    res.send(documents);
  });
});

// Get All Documents From Manufacturers Table (for specific user)
app.post("/manufacturers", (req, res) => {
  csmpTables.getAllManufacturers(req.body.userID).then((documents) => {
    res.send(documents);
  });
});

// Get All Documents From Affixing Table (for specific user and supplier)
app.post("/affixing", (req, res) => {
  csmpTables.getAllParts(req.body.userID, "Affixing", req.body.supplierID).then((documents) => {
    res.send(documents);
  });
});

// Get All Documents From Wood Table (for specific user and supplier)
app.post("/wood", (req, res) => {
  csmpTables.getAllParts(req.body.userID, "Wood", req.body.supplierID).then((documents) => {
    res.send(documents);
  });
});

// Get All Documents From Plywood Table (for specific user and supplier)
app.post("/plywood", (req, res) => {
  csmpTables.getAllParts(req.body.userID, "Plywood", req.body.supplierID).then((documents) => {
    res.send(documents);
  });
});

// Edit a document in the table
app.post('/edit', (req, res) => {
  //console.log(req.body.updatedDocument);
  database.connectAndGetDatabaseObject().then((db) => {
    database.updateSpecificDocument(db, req.body.collectionName, { key: req.body.queryKey }, { $set: req.body.updatedDocument }).then((updateResult) => {
      if(updateResult.modifiedCount === 1){
        res.send(true);
      }
      else{
        console.log("Failed to Update Document in Collection !");
        res.send(false);
      }
    });
  });
});

// Remove a document in the table
app.post('/remove', (req, res) => {
    database.connectAndGetDatabaseObject().then((db) => {
      database.deleteSpecificDocument(db, req.body.collectionName, {key: req.body.deleteDocumentKey}).then((deleteResult) => {
        if(deleteResult.deletedCount === 1){
          res.send(true);
        }
        else{
          console.log("Failed to Delete Document from Collection !");
          res.send(false);
        }
      });
    });
});

// Add a document in the table
app.post('/add', (req, res) => {
  new Promise((res, rej) => {
    database.connectAndGetDatabaseObject().then((db) => {
      database.insertSpecificDocument(db, req.body.collectionName, req.body.newDocument).then((insertResult) => {
        if(insertResult.insertedCount === 1){
          res(true);
        }
        else{
          console.log("Failed to Add New Document to Collection !");
          res(false);
        }
      });
    });
  }).then((value)=>{
    res.send(value);
  });
});

// Get All Documents From Orders Table (for specific user)
app.post("/orders", (req, res) => {
  csmpTables.getAllOrders(req.body.userID).then((documents) => {
    res.send(documents);
  });
});

// Add New Order
app.post('/add-order', (req, res) => {
  new Promise((res, rej) => {
    database.connectAndGetDatabaseObject().then((db) => {
      database.insertSpecificDocument(db, req.body.collectionName, req.body.newDocument).then((insertResult) => {
        if(insertResult.insertedCount === 1){
          res(true);
        }
        else{
          console.log("Failed to Add New Document to Collection !");
          res(false);
        }
      });
    });
  }).then((value)=>{
    res.send(value);
  });
});

// Add Delete Order
app.post('/delete-order', (req, res) => {
  database.connectAndGetDatabaseObject().then((db) => {
    database.deleteSpecificDocument(db, req.body.collectionName, {key: req.body.deleteDocumentKey}).then((deleteResult) => {
      if(deleteResult.deletedCount === 1){
        res.send(true);
      }
      else{
        console.log("Failed to Delete Document from Collection !");
        res.send(false);
      }
    });
  });
});

// Update Exist Order
app.post('/update-order', (req, res) => {
  database.connectAndGetDatabaseObject().then((db) => {
    database.updateSpecificDocument(db, req.body.collectionName, { key: req.body.queryKey }, { $set: req.body.updatedDocument }).then((updateResult) => {
      if(updateResult.modifiedCount === 1){
        res.send(true);
      }
      else{
        console.log("Failed to Update Document in Collection !");
        res.send(false);
      }
    });
  });
});

// JUST FOR TESTING !!!!!!!!!!!!!!!!!!
// app.get("/s", (req,res)=>{
//   res.write("environment : " + process.env.NODE_ENV + " <<>> ");
//   res.write("protocol : " + req.protocol + " <<>> ");
//   res.write("secure : " + req.secure + " <<>> ");
//   res.write("hostname is " + req.hostname + " <<>> ");
//   res.write("url is " + req.originalUrl + " <<>> ");
//   res.end();
//   // res.redirect("/index.html");
// });

// Redirect all unknown urls back to main page !
app.get('*', function (req, res) {
  //res.redirect("/index.html");
  res.send("We are Running !"); // FOR TESTING WHILE WORKING ON BACK-END
});

// Start server listening
app.listen(port, () => {
  console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  console.log(`We are running at http://localhost:${port} !`);
})




