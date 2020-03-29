const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbOper = require('./operations');

const url = 'mongodb://localhost:27017';

const dbname = 'conFusion';

MongoClient.connect(url).then((client) =>{
    console.log('Connected correctly to server');
    const db = client.db(dbname);

    dbOper.insertDocument(db, { name: "DennisPham", description: "Call back hell and Promises" }, "dishes")
    .then((result) => {
        console.log("Insert Document:\n", result.ops);
        return dbOper.findDocument(db, "dishes");
    })
    .then((docs) => {
        console.log("Found Documents:\n", docs);
        return dbOper.updateDocument(db, { name: "DennisPham" }, { description: "Call back hell and Promises is awesome" }, "dishes")
    })
    .then((result) => {
        console.log("Updated Document:\n", result.result);
        return dbOper.findDocument(db, "dishes");
    })
    .then((docs) => {
        console.log("Found Updated Documents:\n", docs);
        return db.dropCollection("dishes");
    })
    .then((result) => {
        console.log("Dropped Collection: ", result);
        return client.close();
    })
    .catch((err) => console.log(err));
})
.catch((err) => console.log(err));

// MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
//     assert.equal(err, null);

//     console.log('Connected correctly to server');

//     const db = client.db(dbname);

//     dbOper.insertDocument(db, { name: "LeThiHoa", description: "This is my second description" },
//         "dishes", (result) => {
//             console.log("Insert Document:\n", result.ops);
//             dbOper.findDocument(db, "dishes", (docs) => {
//                 console.log("Found document:\n", docs);
//                 dbOper.updateDocument(db, { name: "LeThiHoa" }, { description: "Replace This is my second description" }, "dishes", (result) => {
//                     console.log("Updated Document:\n", result.result);
//                     dbOper.findDocument(db, "dishes", (docs) => {
//                         console.log("Found Updated Document:\n", docs);
//                         db.dropCollection("dishes", (result) => {
//                             console.log("Dropped Collection: ", result);
//                             client.close();
//                         });
//                     });
//                 });
//             });
//         });
// });