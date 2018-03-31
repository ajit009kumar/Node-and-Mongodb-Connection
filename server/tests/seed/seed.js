// import { Promise } from 'mongoose';

const { ObjectID } = require('mongodb');
const { Todo } = require('./../../models/todo');

const jwt = require('jsonwebtoken');
const { User } = require('./../../models/users');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id: userOneId,
    email: 'ajit@juspay.in',
    password: 'userOnePass',
    tokens:[{
        access: 'auth',
        token: jwt.sign({_id: userOneId , access: 'auth'} , process.env.JWT_SECRETE).toString()
    }]
}, {
    _id: userTwoId,
    email: 'ajit@myanatomy.in',
    password: 'userTwoPass',
    tokens:[{
        access: 'auth',
        token: jwt.sign({_id: userTwoId , access: 'auth'} , process.env.JWT_SECRETE).toString()
    }]
}];



const todos = [ 
    
        {
            _id: new ObjectID(),
            text: 'First todo',
            _creator: userOneId
        },
        {
            _id: new ObjectID(),
            text: 'Second todo',
            completed: true,
            completedAt: 333,
            _creator: userTwoId
        }
    ];


   const populateTodos = (done) => {
        Todo.remove({}).then(() => {
           return Todo.insertMany(todos);
        }).then(() => done());
    };


    const populateUsers = (done) => {
        User.remove({}).then(() => {
            let userOne = new User(users[0]).save();
            let userTwo = new User(users[1]).save();
            return Promise.all( [ userOne , userTwo ] )
        }).then(() => done());
    };

module.exports = { todos, populateTodos , populateUsers , users };