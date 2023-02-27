var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('mydb');
    var myObj = { name: "Company", address: "Highway 14"};
    dbo.collection('customers').insertOne(myObj, function(err, res) {
        if (err) throw err;
        console.log('1 document inserted');
        db.close();
    });
});