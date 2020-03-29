
exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    
    return  coll.insertOne(document);
};

exports.findDocument = (db, collection, callback) => {
    const coll =  db.collection(collection);

    return coll.find({}).toArray();
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);

    return coll.deleteDocument(document);
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);

    return coll.updateOne(document, {$set: update}, null);
};

// exports.insertDocument = (db, document, collection, callback) => {
//     const coll = db.collection(collection);
    
//     coll.insertOne(document, (err, result) => {
//         console.log("Inserted " + result.result.n +
//             " documents into the collection " + collection);
//         callback(result);
//     });
// };

// exports.findDocument = (db, collection, callback) => {
//     const coll =  db.collection(collection);

//     coll.find({}).toArray((err, docs) => {
//         callback(docs);
//     });
// };

// exports.removeDocument = (db, collection, callback) => {
//     const coll = db.collection(collection);

//     coll.deleteOne(document, (err, result) => {
//         console.log("Removed the document ", document);
//         callback(result);
//     });
// };

// exports.updateDocument = (db, document, update, collection, callback) => {
//     const coll = db.collection(collection);

//     coll.updateOne(document, { $set: update}, null, (err, result) => {
//         console.log("Updated the document with ", update);
//         callback(result);
//     });
// };