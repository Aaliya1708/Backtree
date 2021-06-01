const btree = require("./bptree.js");

const util = require("util");
const {pool} = require('./config');

const query = util.promisify(pool.query).bind(pool);

var traverse = async function(cursor,dpt=0,gap=0,return_value=0){
    if (btree.max_depth<dpt)btree.max_depth=dpt;
    var s_dpt=Math.pow((btree.MAX+1),dpt)-1;
    var rv=btree.MAX*gap+((btree.MAX+1)*return_value);
    var stind = s_dpt+rv;
    //console.log(stind+" "+dpt+" "+k+" "+gap+" "+gapparent+" "+btree.max_depth);
    for(var i=0; i<btree.MAX; i++){
        var sql;
        
        if(i < cursor.size)
            sql =  `INSERT INTO location (search_word, db_index, tree_index) VALUES ('${cursor.key[i]}', '${cursor.ind[i]}','${(stind+i)}')`;     
        else
            sql =  `INSERT INTO location (search_word, db_index, tree_index) VALUES ('-1', '-1','${(stind+i)}')`;       
        
        await query(sql);
        // function(err,result){
        //     if(err) throw err;

        //     console.log("Inserted 1 element");    
        // });
    }
    if(cursor!=null){ 
      if(cursor.IS_LEAF != true){
        for(var i=0 ;i<btree.MAX+1; i++){
            if(i<cursor.size+1)
                await traverse(cursor.ptr[i],dpt+1,i,rv);
            else if(dpt<btree.max_depth) {
                dummy=new btree.Node();
                dummy.size=-1;
                dummy.IS_LEAF=false;
                //console.log(dummy.size);
                await traverse(dummy,dpt+1,i,rv);
            }
                       
        }
    }
    
  }
}

var insertt = async function(){
    var node = new btree.BPTree();
    var sql = 'SELECT * FROM websites';
    console.log("called");
    var data = await query(sql) ;//,function(err,result){
    //console.log("HI");
    //console.log(data.rows);
    for(val of data.rows)
      node.insert(val.search_word);
    //     if(err) throw err;
    //     console.log("fetched");
    //     console.log(result);

    // });
    await traverse(node.getRoot());
    console.log(data);
    return true;
}
var main = async function() {
    var node = new btree.BPTree();
    inp = Array(5,15,25,35,45,55,40,30,20,64, 1,75, 2,88, 3,66,777);
    idx = Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15, 16);
    // for(val of inp){
    //   node.insert(val);
    // }
    /*
    node.insert(5);
    node.insert(15);
    node.insert(25);
    node.insert(35);
    node.insert(45);
    node.insert(55);
    node.insert(40);
    node.insert(30);
    node.insert(20);
    */
    //node.display(node.getRoot());
   
    await insertt(node);
    //console.log(MAX);
    
    
    
    
    //node.search(15);
    //node.search(115);
}
// pool.connect((err)=>{
//     if(err) throw err;

//     main();
// });  

module.exports = insertt;