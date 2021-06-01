const express = require('express');
const puppeteer = require('puppeteer');
const fs=require('fs');
const btreedb = require('./bptreeDB');
const app = express();
const port = 3060;
const searchGoogle = require('./searchGoogle');

btreedb.con.connect(function(err){
    //if(err) throw err;
});


app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.static(__dirname+'/build'));

app.get('/search', (request, response) => {
    const searchQuery = request.query.searchquery;
    if(searchQuery!=null){


        btreedb.searchDB(searchQuery)
        .then(results => {
            response.status(200);
            response.json(results);
            
        });
        
        
    }
    else
    {
        response.end();
    }
  
});

app.get('/', (req, res) => {
    fs.readFile(__dirname+'/build/'+'index.html',function(err,data){
      if(err){
          res.writeHead(404,{'Content-Type': 'text/html'});
          return res.end("404 Not Found");
      }
      res.writeHead(200,{'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });

});


app.post('/insert', (req, res) => {
    const insert = request.query.insertquery;
    // puppeter google search
    // bptree
    // db insert  ( BP)TREE INSERT
});

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}! \n connect at http://localhost:${port}/`));



