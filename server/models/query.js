// import { type } from 'os';

// import { get } from 'mongoose';

// import { Promise } from 'mongoose';

require('./config/config');

const _ = require('lodash');

var express = require('express');
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');


var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/users');
var { Customer } = require('./models/customer');
var { Employee } = require('./models/employee');
const elasticsearch = require('elasticsearch');



var { authenticate } = require('./middleware/authenticate');


var app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());



// User.createMapping({
//     "analysis" : {
//       "analyzer":{
//         "content":{
//           "type":"custom",
//           "tokenizer":"standard"
//         }
//       }
//     }
//   },function(err, mapping){
//       console.log('mapping=====================>', mapping);
//     // do neat things here
//   });


// User.createMapping(function(err,mapping) {
//     if(err) {
//         console.log('error creting mapping');
//         console.log(err);
//     }
//     else{
//         console.log("mapping creted");
//         console.log(mapping);
//     }
// });

// var stream = User.synchronize();
// var count = 0;
// stream.on('data', function() {
//     count ++;
// });

// stream.on('close', function() {
//     console.log("Indexed " + count + " documents ");
// });

// stream.on('error' , function(err) {
//     console.log(err);
// });


User.search({
  bool: {
      must: {
          match: {'email.keyword': 'praddep@gmail.com'}
      }
  }
},function(err,res) {
   console.log('response of user', res.hits.hits);
});


User.search({
    bool:{
        should: [
            {match: {'email.keyword': 'praddep@gmail.com'}},
            {match:{'email.keyword': 'ajeet009kumar@gmail.com'}}
        ]
    }
},function(err,res){
    console.log('response of user document', res.hits.hits);
});


Customer.createMapping(function(err, mapping){  
    if(err){
      console.log('error creating mapping (you can safely ignore this)');
      console.log(err);
    }else{
      console.log('mapping created!');
      console.log(mapping);
    }
  });

  Customer.synchronize()

//   Customer.synchronize();


Customer
.search({
  bool: {
    must: {
      match: {'name': " ris h u      Raj "}
    }
  }
},function(err,res){
    console.log('response of customer', res.hits.hits);
    console.log('total number of hits in customer index', res.hits.total);
});


Customer.search({
        bool:{
            should:[
                {match: {'name': ' Rishu  '}},
                {match:{'name': ' daddu  '}}
            ]            
        }
},function(err,res) {
    console.log('searching of user using should', res.hits.hits);
});

Customer.search({
      bool:{
          must: {
              match_all: {}
          },
          filter: {
            match: {
                name: 'Rishu'
            }
          }
      },
     
},function(err,res){
    console.log('++++++++++++++++++++++++>', res.hits.hits);
});

Customer.search({
    query: {
        match: {
            name: 'daddu'
        }
    }
},function(err,res) {
    console.log('====================>', res);
});


Customer.esSearch({
    query: {
        term: {
            name: " gupta " 
        }
    }
},function(err,res) {
     console.log('response using the term', res.hits.hits);
});



