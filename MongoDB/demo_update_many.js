var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('mydb');
    var myQuery = { address: /^S/};
    var newValues = {$set: {name: "Minnie"}};
    dbo.collection('customers').updateMany(myQuery, newValues, function(err, res) {
        if (err) throw err;
        console.log(res.result.nModified + " document(s) updated");
        db.close();
    })
})