const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/users');


// Todo.remove({}).then((res) => {
//     console.log(res);
// });

// Todo.findByIdAndRemove('5a5bb72332e52c25383c0440').then((todo) => {
//     console.log(todo);
// });

Todo.findOneAndRemove({_id: '5a5bb72432e52c25383c0441'}).then((res) => {
    console.log(res);
});