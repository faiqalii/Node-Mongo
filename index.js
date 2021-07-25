const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {

    assert.strictEqual(err, null);
    console.log('connected correctly to server');

    const db = client.db(dbname);
    dboper.insertDocument(db , { name: "Vadonut", description:"Test"} , 'dishes', (result) => {
        console.log("Inserted document:\n", result.ops);

        dboper.findDocuments( db, 'dishes' , (docs) => {
            console.log("Found documents:\n", docs);

            dboper.updateDocument(db , {name: "Vadonut"} , {description: "Updated Test"}, 'dishes', (result) => {
                console.log("Updated document:\n", result.result);

                dboper.findDocuments(db , 'dishes' , (docs) => {
                    console.log('Found documents again:\n' , docs);

                    db.dropCollection('dishes' ,(result) => {
                        console.log('Dropped collection: ', result);

                        client.close();
                    });
                });
            });
        });
    });

});