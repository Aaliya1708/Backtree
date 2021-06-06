const util = require('util');
const {pool} = require('./config');

var rr;
var MAX=7;
const query = util.promisify(pool.query).bind(pool);


var fetch_record = async function(i){
    //var sql = `SELECT tree_index FROM location ORDER BY tree_index LIMIT 1 OFFSET ${i}`;  
   // UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'
    let data = await query(`SELECT * FROM location ORDER BY tree_index LIMIT 1 OFFSET ${i}`);
    return data.rows;
}

var insert_data = async function(ind, search_word, title, description, url){
  var sql = `INSERT INTO websites (ind, search_word, title, description, url) VALUES (${ind}, '${search_word.replace(/[^a-z 0-9]/gi,'')}', '${title.replace(/[^a-z 0-9]/gi,'')}', '${description.replace(/[^a-z 0-9]/gi,'')}', '${url}')`;
}

// var insert_loc = async function(i, search_word, db_index){
//   //var sql = `SELECT tree_index FROM location ORDER BY tree_index LIMIT 1 OFFSET ${i}`;  
//   let res = await fetch_record(i);
//   if(res.length>0)
//     let data = await query(`UPDATE locations * FROM location ORDER BY tree_index LIMIT 1 OFFSET ${i}`);
//   else {
//     // expand tree to dpt + 1;
//   }
//   return data.rows;
// }


var traverse = async function(dpt=0, gap=0,return_value=0) {
    
    var s_dpt=Math.pow((MAX+1),dpt)-1;
    var rv= MAX*gap+((MAX+1)*return_value);
    var stind = s_dpt+rv;
      // Storing the whole array tree in an array with dummy variables
    var data;
    data = await fetch_record(stind);
    if (data.length==0 || data[0].search_word==-1)return;
    console.log(stind, dpt, gap);
    for (var i = 0; i<MAX; i++) {
        data = await fetch_record((stind+i));
        console.log(data);
    }
        for (var i = 0; i < MAX + 1; i++) {
            await traverse(dpt+1,i,rv);
        }
    
  }

var search = async function(x) {
  var searchTree=[];
    var data = await fetch_record(0);
    var dpt = 0;
    var return_value = 0;
    if (data.length==0 || data[0].search_word==-1){
      console.log("Tree is empty\n");
    } else {
      //var cursor = data[0].tree_index;
      //console.log(data);
      var ans = data;
      //var gapparent = 0;
      
      while (data.length!=0 && data[0].search_word!=-1) {
        for (var i = 0; i <= MAX; i++) {
          if(i==MAX){
            
              dpt=dpt+1;
              var s_dpt=Math.pow((MAX+1),dpt)-1;
              return_value = MAX*MAX+((MAX+1)*return_value);
              var stind = s_dpt+return_value;
              ans = data;
                //console.log(stind);
              data = await fetch_record(stind);
              break;
          }
          var ele_data =  await fetch_record((data[0].tree_index+i));

          console.log(ele_data);
          searchTree.push(ele_data);
          if(ele_data.length==0 || ele_data[0].search_word==-1){
            dpt=dpt+1;
            var s_dpt=Math.pow((MAX+1),dpt)-1;
            return_value = MAX*i+((MAX+1)*return_value);
            var stind = s_dpt+return_value;
            ans = data;
            //console.log(stind);
            data = await fetch_record(stind);
            
            break;
         }
          if (x < ele_data[0].search_word) {
            dpt=dpt+1;
            //var stind = MAX*Math.pow((MAX+1),dpt-1) + MAX*i + data[0].tree_index + gapparent*(MAX*(MAX));
            var s_dpt=Math.pow((MAX+1),dpt)-1;
            return_value = MAX*i+((MAX+1)*return_value);
            var stind = s_dpt+return_value;
            ans = data;
            //console.log(stind);
            data = await fetch_record(stind);
            //gapparent = i;
            break;
          }
        } 
      }
      for (var i = 0; i < MAX; i++) {
        var ele_data =  await fetch_record((ans[0].tree_index+i));
        if(ele_data.length ==0 || ele_data[0].search_word==-1)
        break;
        if (ele_data[0].search_word == x) {
          console.log("Found\n");
          return {"searchTree":searchTree,"ele_data":ele_data};
        }
      }
      console.log("Not found\n");
      return {"searchTree":searchTree,"ele_data":[]};
    }
  }

var fetch_info = async function(i){
  let data = await query(`SELECT * FROM websites ORDER BY ind LIMIT 1 OFFSET ${i}`);
  return data.rows;
} 

// pool.connect(function(err)
// {
//     if(err) throw err;
//     console.log("Connected!");
//     var main = async function(){
//         // for(var i=0;i<=35;i++)
//         // {
//         //     //console.log(fetch_record(i));
//         //     console.log(await fetch_record(i));
//         // }
//         var res = await search('pizza');
//         console.log(res);
//         if(res.length > 0){
//           console.log(res[0].db_index);
//         var  result = await fetch_info(res[0].db_index);
//         console.log(result);
//         }
//         //await search(33);
//         //await search(4);
//         res = await search('aaliya');
//         console.log(res);
//         if(res.length > 0){
//           var  result = await fetch_info(res.db_index);
//           console.log(result);
//           }
        

//     };
//     main();
// });


var searchDB = async function(x){
  var res = await search(x);
  var result;
  //console.log(res);
  if(res.ele_data.length > 0){
  //  console.log(res[0].db_index);
    result = await fetch_info(res.ele_data[0].db_index);
  //console.log(result);
  }
  else
  {
    result = [];

  }
  return {"searchTree": res.searchTree, "result":result};
} 
module.exports = {query,  searchDB};