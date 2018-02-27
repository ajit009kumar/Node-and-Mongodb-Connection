var json2csv = require('json2csv');
var fs = require('fs');
var fields = ['name', 'age', 'rollNo'];

var friends = [{
      "name": "ajeet kumar",
      "age": 23,
      "rollNo": 600
    },
    {
        "name": "rishu",
        "age": 23,
        "rollNo": 62
    },
    {
        "name": "abhishek",
        "age": 23,
        "rollNo": 61
    },
    {
        "name": "shaurya",
        "age": 27,
        "rollNo": 68
    },{
        "name": "HOD",
        "age": 25,
        "rollNo": 45
    },
    {
        "name": "chandu",
        "age": 24,
        "rollNo": 215
    },
    {
        "name": "abhiraj",
        "age": 20,
        "rollNo": 6118
    },
    {
        "name": "shubhankar",
        "age": 23,
        "rollNo": 6110
    },
    {
        "name": "motu",
        "age": 24,
        "rollNo": 152
    },
    {
       "name": "pradeep",
       "age": 25,
       "rollNo": 12 
    },
    {
        "name": "sachin",
        "age": 20,
        "rollNo": 158
    },
    {
        "name": "sush",
        "age": 25,
        "rollNo": 589
    },
    {
        "name": "sush",
        "age": 25,
        "rollNo": 580
    },
    {
        "name": "sush",
        "age": 28,
        "rollNo": 580
    },
    {
        "name": "sush",
        "age": 29,
        "rollNo": 12 
    },
    {
        "name": "sush",
        "age": 39,
        "rollNo": 12 
    },
    {
        "name": "sush",
        "age": 49,
        "rollNo": 120 
    },
    "/n"

    ]

// console.log(friends)

var csv = json2csv({ data: friends, fields: fields });
fs.writeFile('output_test1.csv', csv, function(err) {
    if (err) throw err;
    console.log('file saved');
  });