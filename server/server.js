var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todos');
var { User } = require('./models/users');



var newTodo = new Todo({
    text: '  Hii First Model design  '
});

newTodo.save().then((docs) => {
   console.log(docs);
},(error) => {
    console.log('  Failed to save the Todo  ');
});


var secondTodo = new Todo(
{
    text: 'Insert the second Record',
    completed: true,
    completedAt: 25
});

secondTodo.save().then((doc) => {
   console.log(doc);
},(err) => {
   return console.log('Unable to connect');
});



var newUser = new User({
    email: 'ajeet'
});

newUser.save().then((docs) => {
    console.log(docs);
},(error) => {
    console.log('Unable to connect');
});
