var MAX = 7;
var max_depth=0;
// BP node
class Node {
    constructor() {
        this.key = new Array(MAX);
        this.ptr = new Array(MAX + 1);
        this.IS_LEAF = false;
        this.size = new Array();
        //console.log(ind);
        this.ind = new Array(MAX);
    }
};

// BP tree
class BPTree {
    constructor(){
        this.root = null;
        this.numele = 0;
    }
    static insertInternal;
    static findParent;

    static search;
    static insert;
    static display;
    static getRoot;
};

// Search operation
BPTree.prototype.search = function(x) {
  if (this.root == null) {
    console.log("Tree is empty\n");
  } else {
    var cursor = this.root;
    while (cursor.IS_LEAF == false) {
      for (var i = 0; i < cursor.size; i++) {
        if (x < cursor.key[i]) {
          cursor = cursor.ptr[i];
          break;
        }
        if (i == cursor.size) {
          cursor = cursor.ptr[i ];
          break;
        }
      }
    }
    for (var i = 0; i < cursor.size; i++) {
      if (cursor.key[i] == x) {
        console.log("Found\n");
        return;
      }
    }
    console.log("Not found\n");
  }
}

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

// Find the parent
BPTree.prototype.findParent =  function(cursor,child) {
  var parent;
  if (cursor.IS_LEAF || (cursor.ptr[0]).IS_LEAF) {
    return null;
  }
  for (var i = 0; i < cursor.size + 1; i++) {
    if (cursor.ptr[i] == child) {
      parent = cursor;
      return parent;
    } else {
      parent = this.findParent(cursor.ptr[i], child);
      if (parent != null)
        return parent;
    }
  }
  return parent;
}

// Print the tree
BPTree.prototype.display = function(cursor,dpt=0, gap=0,return_value=0) {
  if (cursor != null) {
    //console.log("$"+cursor.ind+"$");
    var s_dpt=Math.pow((MAX+1),dpt)-1;
    var rv= MAX*gap+((MAX+1)*return_value);
    var stind = s_dpt+rv;

    // Storing the whole array tree in an array with dummy variables
    for (var i = 0; i<MAX; i++) {
      if(i < cursor.size)
        console.log(cursor.key[i]+" "+cursor.ind[i]+" "+(stind+i));
      else
        console.log("-1 -1 "+ (stind+i));
    }
    if (cursor.IS_LEAF != true) {
      for (var i = 0; i < cursor.size + 1; i++) {
        this.display(cursor.ptr[i],dpt+1,i,rv);
      }
    }
  }
}

// Get the root
BPTree.prototype.getRoot = function() {
  return this.root;
}


module.exports = {Node, BPTree, MAX,max_depth};