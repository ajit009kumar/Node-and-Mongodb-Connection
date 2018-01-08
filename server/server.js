var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo',{
     text: {
         type: String,
         required: true,
         minlength:1,
         trim: true
     },
     completed: {
         type: Boolean,
         default: false
     },
     completedAt: {
         type: Number,
         default: null
     }
});

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

var User = mongoose.model('User',{
     email: {
         type: String,
         required: true,
         trim: true,
         minlength: 1
     }
});

var newUser = new User({
    email: 'ajeet'
});

newUser.save().then((docs) => {
    console.log(docs);
},(error) => {
    console.log('Unable to connect');
});
