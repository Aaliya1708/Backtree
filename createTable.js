var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "project"
});


con.connect(function(err) {
 if (err) throw err;
  console.log("Connected!");
 // var sql = "CREATE TABLE websites (ind INTEGER, search_word VARCHAR(255), title VARCHAR(255), description VARCHAR(2048), url VARCHAR(255))";
 var sql = "CREATE TABLE location (search_word VARCHAR(255), db_index INTEGER,  tree_index INTEGER)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
