const {Client, Pool} = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'project',
  password: 'aaliya',
  port: 5432,
});


pool.connect(function(err) {
 if (err) throw err;
  console.log("Connected!");
 var sql = "CREATE TABLE websites (ind INTEGER, search_word VARCHAR(255), title VARCHAR(255), description VARCHAR(2048), url VARCHAR(255))";
 //var sql = "CREATE TABLE location (search_word VARCHAR(255), db_index INTEGER,  tree_index INTEGER)";
  pool.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
