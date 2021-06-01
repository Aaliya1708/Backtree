const util = require('util');
const {Client, Pool} = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'project',
  password: 'aaliya',
  port: 5432,
});

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
  var sql = `INSERT INTO websites (ind, search_word, title, description, url) VALUES (${ind}, '${item.replace(/[^a-z 0-9]/gi,'')}', '${results[0].title.replace(/[^a-z 0-9]/gi,'')}', '${results[0].description.replace(/[^a-z 0-9]/gi,'')}', '${results[0].url}')`;
}

var insert_loc = async function(i, search_word, db_index){
  //var sql = `SELECT tree_index FROM location ORDER BY tree_index LIMIT 1 OFFSET ${i}`;  
  
  let data = await query(`UPDATE locations * FROM location ORDER BY tree_index LIMIT 1 OFFSET ${i}`);
  return data.rows;
}

/*

// Insert Operation
BPTree.prototype.insert = function(x) {
  if (this.root == null) {
    this.root = new Node();
    this.root.key[0] = x;
    this.root.IS_LEAF = true;
    this.root.size = 1;
    this.root.ind[0] = this.numele;
  } else {
    var cursor = this.root;
    var parent;
    while (cursor.IS_LEAF == false) {
      parent = cursor;
      for (var i = 0; i < cursor.size; i++) {
        if (x < cursor.key[i]) {
          cursor = cursor.ptr[i];
          break;
        }
        if (i == cursor.size - 1) {
          cursor = cursor.ptr[i + 1];
          break;
        }
      }
    }
    if (cursor.size < MAX) {
      var i = 0;
      while (x > cursor.key[i] && i < cursor.size)
        i++;
      for (var j = cursor.size; j > i; j--) {
        cursor.key[j] = cursor.key[j - 1];
        cursor.ind[j] = cursor.ind[j - 1];
      }
      cursor.key[i] = x;
      cursor.ind[i] = this.numele;
      cursor.size++;
      cursor.ptr[cursor.size] = cursor.ptr[cursor.size - 1];
      cursor.ptr[cursor.size - 1] = null;
    } else {
      var newLeaf = new Node();
      var virtualNode = new Array(MAX + 1);
      var virtualInd = new Array(MAX + 1);
      for (var i = 0; i < MAX; i++) {
        virtualNode[i] = cursor.key[i];
        virtualInd[i] = cursor.ind[i];
      }
      var i = 0;
      var j;
      while (x > virtualNode[i] && i < MAX)
        i++;
      for (var j = MAX + 1; j > i; j--) {
        virtualNode[j] = virtualNode[j - 1];
        virtualInd[j] = virtualInd[j - 1];
      }
      virtualNode[i] = x;
      virtualInd[i] = this.numele;
      newLeaf.IS_LEAF = true;
      cursor.size = (MAX + 1) / 2;
      newLeaf.size = MAX + 1 - (MAX + 1) / 2;
      cursor.ptr[cursor.size] = newLeaf;
      newLeaf.ptr[newLeaf.size] = cursor.ptr[MAX];
      cursor.ptr[MAX] = null;
      for (var i = 0; i < cursor.size; i++) {
        cursor.key[i] = virtualNode[i];
        cursor.ind[i] = virtualInd[i];
      }
      for (var i = 0, j = cursor.size; i < newLeaf.size; i++, j++) {
        newLeaf.key[i] = virtualNode[j];
        newLeaf.ind[i] = virtualInd[j];
      }
      if (cursor == this.root) {
        var newRoot = new Node(this.numele);
        newRoot.key[0] = newLeaf.key[0];
        newRoot.ind[0] = newLeaf.ind[0];
        newRoot.ptr[0] = cursor;
        newRoot.ptr[1] = newLeaf;
        newRoot.IS_LEAF = false;
        newRoot.size = 1;
        this.root = newRoot;
      } else {
        this.insertInternal(newLeaf.key[0], parent, newLeaf);
      }
    }
  }
  this.numele++;
  
}

// Insert Operation
BPTree.prototype.insertInternal = function(x,cursor,child) {
  if (cursor.size < MAX) {
    var i = 0;
    while (x > cursor.key[i] && i < cursor.size)
      i++;
    for (var j = cursor.size; j > i; j--) {
      cursor.key[j] = cursor.key[j - 1];
      cursor.ind[j] = cursor.ind[j - 1];
    }
    for (var j = cursor.size + 1; j > i + 1; j--) {
      cursor.ptr[j] = cursor.ptr[j - 1];
    }
    cursor.key[i] = x;
    cursor.ind[i] = this.numele;
    cursor.size++;
    cursor.ptr[i + 1] = child;
  } else {
    var newInternal = new Node();
    var virtualKey = Array(MAX + 1);
    var virtualInd = Array(MAX + 1);
    var virtualPtr = Array(MAX + 2);
    for (var i = 0; i < MAX; i++) {
      virtualKey[i] = cursor.key[i];
      virtualInd[i] = cursor.ind[i];
    }
    for (var i = 0; i < MAX + 1; i++) {
      virtualPtr[i] = cursor.ptr[i];
    }
    var i = 0;
    var j;
    while (x > virtualKey[i] && i < MAX)
      i++;
    for (var j = MAX + 1; j > i; j--) {
      virtualKey[j] = virtualKey[j - 1];
      virtualInd[j] = virtualInd[j - 1];
    }
    virtualKey[i] = x;
    virtualInd[i] = this.numele;
    for (var j = MAX + 2; j > i + 1; j--) {
      virtualPtr[j] = virtualPtr[j - 1];
    }
    virtualPtr[i + 1] = child;
    newInternal.IS_LEAF = false;
    cursor.size = (MAX + 1) / 2;
    newInternal.size = MAX - (MAX + 1) / 2;
    for (var i = 0, j = cursor.size + 1; i < newInternal.size; i++, j++) {
      newInternal.key[i] = virtualKey[j];
      newInternal.ind[i] = virtualInd[j];
    }
    for (var i = 0, j = cursor.size + 1; i < newInternal.size + 1; i++, j++) {
      newInternal.ptr[i] = virtualPtr[j];
    }
    if (cursor == this.root) {
      var newRoot = new Node();
      newRoot.key[0] = cursor.key[cursor.size];
      newRoot.ind[0] = cursor.ind[cursor.size];
      newRoot.ptr[0] = cursor;
      newRoot.ptr[1] = newInternal;
      newRoot.IS_LEAF = false;
      newRoot.size = 1;
      this.root = newRoot;
    } else {
      this.insertInternal(cursor.key[cursor.size], this.findParent(this.root, cursor), newInternal);
    }
  }
}


*/
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
        for (var i = 0; i < MAX; i++) {
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
  let data = await query(`SELECT * FROM websites ORDER BY ind LIMIT ${i},1`);
  return data;
} 

pool.connect(function(err)
{
    if(err) throw err;
    console.log("Connected!");
    var main = async function(){
        // for(var i=0;i<=35;i++)
        // {
        //     //console.log(fetch_record(i));
        //     console.log(await fetch_record(i));
        // }
        var res = await search('pizza');
        console.log(res);
        if(res.length > 0){
          console.log(res[0].db_index);
        var  result = await fetch_info(res[0].db_index);
        console.log(result);
        }
        //await search(33);
        //await search(4);
        res = await search('aaliya');
        console.log(res);
        if(res.length > 0){
          var  result = await fetch_info(res.db_index);
          console.log(result);
          }
        

    };
    main();
});


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
//module.exports = {pool, query,  searchDB};