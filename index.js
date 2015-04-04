var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var cors = require('cors');
var db = null;

var url = 'mongodb://localhost:27017/mydb';
MongoClient.connect(url, function(err, _db) {
  if(err){
    console.log('Connection Error');
  }
  else{
    console.log("Connected correctly to server");
    db = _db;
  }
});

app.use(cors());
app.use(express.static('public'));

app.get('/api/add/:name', function (req, res) {
  insertDocuments(db, {"name": req.params.name}, 
    function(result){
      res.send(result);
    },
    function(err){
      res.status(500).send(err);
    }
  );
});

app.get('/api/show', function (req, res) {
  findDocuments(db, 
    function(docs){
      res.send(docs);
    },
    function(err){
      res.status(500).send(err);
    }
  );
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});


// Function //

function insertDocuments(db, data, success, error) {
  var collection = db.collection('member');
  collection.insert(data, function(err, result) {
    if(err){
      error(err);
    }else{
      success(result);
    }
  });
}
function findDocuments(db, success, error) {
  var collection = db.collection('member');
  collection.find({}).toArray(function(err, result) {
    if(err){
      error(err);
    }else{
      success(result);
    }
  });
}