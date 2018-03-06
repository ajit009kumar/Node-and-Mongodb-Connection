// import { json } from '../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/body-parser';

var json2csv = require('json2csv');
var fs = require('fs');
var fields = ['name', 'age', 'rollNo'];
let jsonvalue = '';

var friends = {"userId": "12345678901", "userName": "pradeep prakash", "location": "bengaluru","contact": ""}
 jsonvalue += `${JSON.stringify(friends)}\r\n`;

console.log(friends)

// var csv = json2csv({ data: friends, fields: fields });
fs.appendFile('C:\\Users\\MYANATOMY\\Downloads\\node-todo-api\\logstashInput\\students.json', jsonvalue, function(err) {
    if (err) throw err;
    console.log('file saved');
  });