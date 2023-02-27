var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('mydb');
    var myQuery = { address: 'Mountain 21'};
    dbo.collection('customers').deleteOne(myQuery, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        db.close();
    });
});