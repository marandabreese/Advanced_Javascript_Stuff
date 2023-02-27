var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('mydb');
    dbo.collection('customers').drop(function(err, delOk) {
        if (err) throw err;
        if (delOk) console.log('Collection deleted');
        db.close();
    })
})