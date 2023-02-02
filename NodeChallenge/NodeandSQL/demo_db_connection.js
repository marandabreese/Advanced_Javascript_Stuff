const mysql = require('mysql2');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mriNDA060995$",
    database: "mydb"
});

con.connect(function(err){
    if (err) throw err;
    console.log('Connected!');
    let sql = `SELECT * FROM customers WHERE address LIKE '8%'`;
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log(result);
    })
})