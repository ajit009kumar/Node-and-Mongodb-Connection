require('./config/config');

const _ = require('lodash');

var express = require('express');
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');


var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/users');


var app = express();
const port = process.env.PORT || 3000;


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

app.get('/todos',(req,res) => {

        Todo.find().then((todos) => {
            res.send({todos})
        },(e) => {
            res.status(400).send(e);
        });
});


app.get('/todos/:id',(req,res) => {
        var id = req.params.id;
        if (! ObjectID.isValid(id)) {
          return  res.status(404).send({});
        }

        Todo.findById(id).then((todos) => {
            if ( !todos ) {
               return res.status(404).send({})
            }
            res.send({todos});
        }).catch((e) => {
              res.status(400).send({});
        });
});


app.delete('/todos/:id',(req,res) => {
     var id = req.params.id;
     if ( ! ObjectID.isValid(id) ) {
         return res.status(404).send({});
     }
     Todo.findByIdAndRemove(id).then((todos) => {
            if ( !todos ) {
                return res.status(404).send({});
            }
            res.status(200).send({todos});
     }).catch((e) => {
         return res.status(400).send({});
     })

});

app.patch('/todos/:id',(req,res) => {

        var id = req.params.id;
        var body = _.pick(req.body,['text','completed']);
        if ( ! ObjectID.isValid(id) ) {
            return res.status(404).send({});
        }
        if ( _.isBoolean(body.completed) && body.completed ) {
             body.completedAt = new Date().getTime();
        }
        else {
            body.completed = false;
            body.completedAt = null;
        }
        Todo.findByIdAndUpdate(id , {$set: body} , {new: true}).then((todos) => {
                 
             if(!todos) {
                return res.status(404).send({});
             }
             res.status(200).send({todos});
             

        }).catch((e) => {
            return res.status(400).send({});  
        })
});



app.post('/users', (req,res) => {
   let body = _.pick(req.body,['email', 'password']);
   let user = new User(body);
   user.save().then(() => {
    return user.generateAuthToken();
   }).then((token) => {
        res.header('x-auth', token).send(user);
   }).catch((e) => {
       res.status(400).send(e);
   });
})


app.listen('3000',() => {
    console.log(`Started at port ${port}`);
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