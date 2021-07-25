const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url).then((client) => {
    console.log('connected correctly to server');

    const db = client.db(dbname);
    return dboper.insertDocument(db , { name: "Vadonut", description:"Test"} , 'dishes')
    .then((result) => {
        console.log("Inserted document:\n", result.ops);

        return dboper.findDocuments( db, 'dishes')
    })
    .then((docs) => {
        console.log("Found documents:\n", docs);

        return dboper.updateDocument(db , {name: "Vadonut"} , {description: "Updated Test"}, 'dishes')
     })
    .then((result) => {
        console.log("Updated document:\n", result.result);

        return dboper.findDocuments(db , 'dishes')
      })
    .then((docs) => {
        console.log('Found documents again:\n' , docs);

        return db.dropCollection('dishes')
    })
    .then((result) => {
        console.log('Dropped collection: ', result);

        client.close();
    });
})
.catch((err) => console.log(err));