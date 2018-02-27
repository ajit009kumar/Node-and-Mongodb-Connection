var json2csv = require('json2csv');
var fs = require('fs');
var fields = ['name', 'age', 'rollNo'];

var friends = [ 
    {
      "name": "ajeet kumar",
      "age": 23,
      "rollNo": 61468
    },
    {
        "name": "rishu",
        "age": 23,
        "rollNo": 6213
    },
    {
        "name": "abhishek",
        "age": 23,
        "rollNo": 6180
    },
    {
        "name": "shaurya",
        "age": 23,
        "rollNo": 61138
    },
    {
        "name": "shushobhith",
        "age": 24,
        "rollNo": 6290
    },
    {
        "name": "HOd",
        "age": 26,
        "rollNo": 568
    },
    {
        "name": "Daddu gupta",
        "age": 24,
        "rollNo": 25
    },
]

console.log(friends)

var csv = json2csv({ data: friends, fields: fields });
fs.writeFile('output.csv', csv, function(err) {
    if (err) throw err;
    console.log('file saved');
  });