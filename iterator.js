const { searchGoogle, multiGoogleSearch} = require('./searchGoogle');
var a = require('./search_words.json');
const util = require('util');
const {pool} = require('./config');

 const query = util.promisify(pool.query).bind(pool);

//console.log(fs.readFile('./search_words.json'));
cat = ['food','animal','clothes','city'];
let dummyCollect = async function(){
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
         await query(sql);
         //, function (err, result) {
         //   if (err) throw err;
         //   console.log("1 record inserted");
         //});
      }
      }
   } 
};

var collectData = async function(inputq){
   var cnt =0;
      for(var item of inputq){
         let results = await searchGoogle(item);
         //results['search_word'] = item;
         //console.log(results);
         if(results.length > 0){
            var sql = `INSERT INTO websites (ind, search_word, title, description, url) VALUES (${cnt}, '${item.replace(/[^a-z 0-9]/gi,'')}', '${results[0].title.replace(/[^a-z 0-9]/gi,'')}', '${results[0].description.replace(/[^a-z 0-9]/gi,'')}', '${results[0].url}')`;
            cnt++;
         //console.log(sql);
            await query(sql, function (err, result) {
               if (err) throw err;
               console.log("1 record inserted");
            });
         }
      }
};
//main();

// pool.connect(function(err) {
//    if (err) throw err;
//    console.log("Connected!");
   
//    main();
// });

//console.log(a);


module.exports = dummyCollect;