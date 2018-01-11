var express = require('express');
var bodyParser = require('body-parser');



var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/users');


var app = express();


app.use(bodyParser.json());

app.post('/todos',(req,res) => {

    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
         res.send(doc);
    },(e) => {
        res.status(400).send(e);  
    });
});


app.listen('3000',() => {
    console.log('listening on 3000');
 });
 




// var newTodo = new Todo({
//     text: '  Hii First Model design  '
// });

// newTodo.save().then((docs) => {
//    console.log(docs);
// },(error) => {
//     console.log('  Failed to save the Todo  ');
// });


// var secondTodo = new Todo(
// {
//     text: 'Insert the second Record',
//     completed: true,
//     completedAt: 25
// });

// secondTodo.save().then((doc) => {
//    console.log(doc);
// },(err) => {
//    return console.log('Unable to connect');
// });



// var newUser = new User({
//     email: 'ajeet'
// });

// newUser.save().then((docs) => {
//     console.log(docs);
// },(error) => {
//     console.log('Unable to connect');
// });



module.exports = { app };