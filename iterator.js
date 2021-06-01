const {Client, Pool} = require('pg');
const searchGoogle = require('./searchGoogle');
var a = require('./search_words.json');


const pool = new Pool({
   user: 'postgres',
   host: 'localhost',
   database: 'project',
   password: 'aaliya',
   port: 5432,
 });
 


//console.log(fs.readFile('./search_words.json'));
cat = ['food','animal','clothes','city'];
let main = async function(){
   var cnt =0;
   for(var element of cat){
      console.log(element);
      for(var item of a[element]){
         let results = await searchGoogle(item);
         //results['search_word'] = item;
         console.log(results);
         if(results.length == 0){console.log(item);}
         else{
         var sql = `INSERT INTO websites (ind, search_word, title, description, url) VALUES (${cnt}, '${item.replace(/[^a-z 0-9]/gi,'')}', '${results[0].title.replace(/[^a-z 0-9]/gi,'')}', '${results[0].description.replace(/[^a-z 0-9]/gi,'')}', '${results[0].url}')`;
         cnt++;
         console.log(sql);
         pool.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
         });
      }
      }
   } 
};
//main();

pool.connect(function(err) {
   if (err) throw err;
   console.log("Connected!");
   
   main();
});

//console.log(a);
