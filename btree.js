
//let keys = [];
//let BtreeNodes = [];

key_pushback = function(val, ind=-1){
    return;
};

BtreeNode_pushback = function(val, ind=-1){
    return;
};

class BtreeNode{
    constructor(_t, _leaf){
        this.n = 0;
        this.C=[];
        this.t=_t;
        this.leaf=_leaf;
        //console.log(this.t);
        this.keys=new Array(2*this.t-1);
        this.C=new Array(2*this.t); 
    }
    
    static insertNonFull; // = function(k){    };
    static splitChild; // = function(i,y){};
    static traverse;// = function(){};
    static search;// = function(k){};
//friend class Btree;
};
class Btree
{
    constructor(_t){
        this.root = null;
        this.t = _t;
        //console.log(this.t);
    }

    static traverse;
    static search; 
   static insert; // = function(k){};
};

Btree.prototype.traverse = function(){
    if(this.root!=null){
        this.root.traverse();
    }
}

Btree.prototype.search =function(k){
    if(this.root===null)
    {
        return 0;
    }
    else{
       return this.root.search(k);
    }
    
}

BtreeNode.prototype.traverse = function(){
    var i;
	for (i = 0; i < this.n; i++)
	{
		if (this.leaf == false){
            this.C[i].traverse();
        }
        console.log(" "+this.keys[i]);
	}
	if (this.leaf == false){
        this.C[i].traverse();
    }
		
}
BtreeNode.prototype.search = function(k)
{
    var i = 0;
	while (i < this.n && k > this.keys[i]){
        i++;
    }
		
	if (this.keys[i] == k)
		return this;
	if (this.leaf == true)
		return null;
	return this.C[i].search(k);
}
Btree.prototype.insert = function(k)
{
    //console.log(this.t);
    if (this.root == null)
	{
		this.root = new BtreeNode(this.t, true);
		this.root.keys[0] = k; 
		this.root.n = 1;
	}
	else
	{
		if (this.root.n == 2*this.t-1)
		{
			var s = new BtreeNode(this.t, false);
			s.C[0] = this.root;
			s.splitChild(0, this.root);
			var i = 0;
			if (s.keys[0] < k)
				i++;
			s.C[i].insertNonFull(k);
			this.root = s;
		}
		else{
            this.root.insertNonFull(k);
        }   
			
	}
}
BtreeNode.prototype.insertNonFull = function(k)
{
    var i = this.n-1;
	if (this.leaf == true)
	{
		while (i >= 0 && this.keys[i] > k)
		{
			this.keys[i+1] = this.keys[i];
			i--;
		}
		this.keys[i+1] = k;
		this.n = this.n+1;
	}
	else
	{
		while (i >= 0 && this.keys[i] > k)
			i--;
		if (this.C[i+1].n == 2*this.t-1)
		{
			this.splitChild(i+1, this.C[i+1]);
			if (this.keys[i+1] < k)
				i++;
		}
		this.C[i+1].insertNonFull(k);
	}
}
BtreeNode.prototype.splitChild = function(i,y)
{
    var z = new BtreeNode(y.t, y.leaf);
	z.n = this.t - 1;
	for (var j = 0; j < this.t-1; j++)
		z.keys[j] = y.keys[j+this.t];
	if (y.leaf == false)
	{
		for (var j = 0; j < this.t; j++)
			z.C[j] = y.C[j+this.t];
	}
	y.n = this.t - 1;
	for (var j = this.n; j >= i+1; j--)
		this.C[j+1] = this.C[j];
	this.C[i+1] = z;
	for (var j = this.n-1; j >= i; j--)
		this.keys[j+1] = this.keys[j];
	this.keys[i] = y.keys[this.t-1];
	this.n = this.n + 1;
}

var main = function () {
    var arr = new Btree(4);
	arr.insert(10);
	arr.insert(20);
	arr.insert(5);
	arr.insert(6);
	arr.insert(12);
	arr.insert(30);
	arr.insert(7);
	arr.insert(17);

    console.log( "Traversal of the constucted tree is ");
	arr.traverse();

	var k = 6;
    if(arr.search(k)!=null)
    {
        console.log('present');
    }
    else
    {
        console.log('not present');
    }
    k=15;
    if(arr.search(k)!=null)
    {
        console.log('present');
    }
    else
    {
        console.log('not present');
    }
}
main();