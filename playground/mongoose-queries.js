const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/users');



var id = '5a57c064479387208cfeef68';

if ( ! ObjectID.isValid(id) ){
    console.log('Object id is not valid');
}

Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos)
});


Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo', todo)
});


Todo.findById(id).then((todo) => {
    if (!todo) {
       return  console.log('unable to find');
    }
    console.log('find By id', todo);
}).catch((e) => console.log(e));


var userId = '5a53cf7259fe830c44a73334';

User.findById(userId).then((user) => {
    if (!user) {
       return console.log('unable to find user');
    }
    console.log('User',JSON.stringify(user,undefined,2));
}).catch((e) => console.log(e));

