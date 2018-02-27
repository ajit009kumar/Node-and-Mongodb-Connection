// import { type } from 'os';

// import { get } from 'mongoose';

// import { Promise } from 'mongoose';

require('./config/config');

const _ = require('lodash');

var express = require('express');
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');


var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/users');
var { Customer } = require('./models/customer');
var { Employee } = require('./models/employee');
var { Product } = require('./models/product');
var { Car } = require('./models/cars');
var { Consumer , Comment } = require('./models/consumer');
const elasticsearch = require('elasticsearch');
// var elasticsearch = require('elasticsearch');

var { authenticate } = require('./middleware/authenticate');


var app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());



var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
  });

// client.ping({
//     requestTimeout: 30000,
//   }, function (error) {
//     if (error) {
//       console.error('elasticsearch cluster is down!');
//     } else {
//       console.log('All is well');
//     }
//   });


//   client.search({
//     index: 'students',
//     type: '_doc',
//     body: {
//       query: {
//           bool: {
//               must: [
//                  {match: {name: 'John Doe'}}
//               ]
//           }
//       }
//     }
//   }).then(function (resp) {
//       var hits = resp.hits.hits;
//       console.log('client hits======>', hits);
//   }, function (err) {
//       console.trace(err.message);
//   });

client.search({
    index: 'collegestudents',
    type:  'college',
    body: {
        query: {
            match: {"userId": "5a7beda92e5521389cd60c1f"}
        }
    }
}).then((res) => {
    console.log('collegestudents is searched', res.hits.hits);
});

// client.search({
//     index: 'candidate',
//     type: 'stud',
//     body: {
//         query: {
//             match: {"name": "sush"}
//         }
//         }
// }).then((res) => {
//     console.log('friends search',res.hits.hits);
// });

// client.deleteByQuery({
//     index: 'candidate',
//     type: 'stud',
//     body: {
//         query: {
//             match: {"message.keyword": ""}
//         }
//     }

// },function(err,res) {
//     console.log('delete by query', res);
// });

// Consumer.esSearch({
//     query_string: {query: "Ds"},
//     hydrate: {
//         populate: {
//           path: 'comments',
//           select: 'title'
//         }
//       }
// },function(err,res) {
//     console.log('res======of==========>', res)
// });

// client.candidate.refresh({
//     index: 'candidate',
//     type: 'stud',
// }).then((res) => {
//     console.log('refresh of candidate index is called');
// })

//   client.search({
//       index: 'cars',
//       type: 'sold_cars',
//       body: {
//           query: {
//             match: {
//                 mileage: 185754
//             }
//           }
//       }
//   }).then((res) => {
//       console.log('cars search result======>', res);
//   });

User.search({
  bool: {
      must: {
          match: {'email.keyword': 'praddep@gmail.com'}
      }
  }
},function(err,res) {
//    console.log('response of user', res.hits.hits);
});


Customer.refresh({
    
    },function(err,res){
        // console.log('refresh is called',res)
});
    


User.search({
    bool:{
        should: [
            {match: {'email.keyword': 'praddep@gmail.com'}},
            {match:{'email.keyword': 'ajeet009kumar@gmail.com'}}
        ]
    }
},function(err,res){
    //  console.log('response of user document', res);
});


Customer.createMapping(function(err, mapping){  
    if(err){
    //   console.log('error creating mapping (you can safely ignore this)');
    //   console.log(err);
    }else{
    //   console.log('mapping created!');
    //   console.log(mapping);
    }
  });


  Product.createMapping(function(err,mapping) {
      if (err) {
         // console.log('problem in product mapping');
      }
      else{
       // console.log(mapping);
      }
  });

//   Consumer.createMapping(function(err,mapping) {
//       if (err) {

//       }
//       else {

//       }
//   });


  Car.esSearch({
    query: {
        match: {
            mileage: 185754
        }
    }
  },function(err,res) {
       console.log('time taken to search',res.took);
       console.log('search value====>', res.hits.hits);

  });

//   Consumer.esSearch({
//       query: {
//           match_all: {}
//       }
//   },function(err,res) {
//       console.log('consumer error====>', res.hits.hits)
//   });
  

//   var stream = Product.synchronize();
//   var count = 0;

//   stream.on('data', function(err, doc){
//     console.log(doc)
//     count++;
//   });
//   stream.on('close', function(){
//     console.log('indexed ' + count + ' documents!');
//   });
//   stream.on('error', function(err){
//     console.log(err);
//   });

//   Product.esSearch({
//       query: {
//           match: {
//             "product_name": " Laptop "
//           }
//       }
//   },function(err,res) {
//       console.log('Product searched',res.hits.hits);
//   });




Customer
.search({
  bool: {
    must: {
      match: {'name': " ris h u      Raj "}
    }
  }
},function(err,res){
    // console.log('response of customer', res.hits.hits);
    // console.log('total number of hits in customer index', res.hits.total);
});


Customer.search({
        bool:{
            should:[
                {match: {'name': ' Rishu  '}},
                {match:{'name': ' daddu  '}}
            ]            
        }
},function(err,res) {
    // console.log('searching of user using should', res.hits.hits);
});

Customer.search({
      bool:{
          must: {
              match_all: {}
          },
          filter: {
            match: {
                name: 'Rishu'
            }
          }
      },
     
},function(err,res){
    // console.log('++++++++++++++++++++++++>', res.hits.hits);
})


Customer.esSearch({
        query: {
          match: {
              name: ' Rishu '
          }
        },
        from: 0,
        size: 1
},function(err,res) {
    //  console.log('res due to pagination',res.hits.hits);
});


Customer.esSearch({
    query: {
        match: {
            name: " gupta " ,
        }
    }
},function(err,res) {
    //  console.log('response using the term', res.hits.hits);
});


app.post('/car',(req,res) => {

    var car = new Car({
        maker: req.body.maker,
        price_eur: req.body.price_eur
    });

    car.save().then((doc) => {
        res.send(doc);
    },(e) => {
        res.status(400).send(e);
    });
});


app.post('/product', (req,res) => {
    var product = new Product({
        product_name: req.body.product_name, 
        price: req.body.price
    });
    product.save().then((doc) => {
        res.send(doc);
    },(e) => {
        res.status(400).send(e);
    });
});



app.post('/employee', (req,res) => {
     var employee = new Employee({
         name: req.body.name,
         email: req.body.email,
         age: req.body.age,
         salary: req.body.salary,
         state:req.body.state,
         designation: req.body.designation
     });
     employee.save().then((doc) => {
        res.send(doc);
     },(e) => {
         res.status(400).send(e);
     });
});


app.post('/consumer',(req,res) => {

    const newComments = new Comment({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author
    });

    newComments.save().then((doc) => {
         Consumer.create({
            comments: doc
          });
          res.send(doc);
    },(e) => {
        res.status(400).send(e);
    }) 
});


app.patch('/consumer/:id', (req,res) => {
    // console.log('consumer req=======>', req);
    var id = req.params.id;
    var body = _.pick(req.body,['name','email','city']);
    if ( ! ObjectID.isValid(id) ) {
        return res.status(404).send({});
    }
    Consumer.findByIdAndUpdate(id , {$set: body} , {new: true}).then((todos) => {
        if(!todos) {
           return res.status(404).send({});
        }
        res.status(200).send({todos});
        
   }).catch((e) => {
       return res.status(400).send({});  
   })
});



app.post('/customers' , (req,res) => {
    var customer = new Customer({
        name: req.body.name,
        price: req.body.price,
        email: req.body.email
    });
    customer.save().then((doc) => {
        res.send(doc);
    },(e) => {
        res.status(400).send(e);
    });
});


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
});

app.patch('/users/:id', (req,res) => {
    var id = req.params.id;
    let body = _.pick(req.body,['email', 'password']);
    if ( ! ObjectID.isValid(id) ) {
        return res.status(404).send({});
    }

    User.findByIdAndUpdate(id , {$set: body} , {new: true}).then((todos) => {
         if(!todos) {
            return res.status(404).send({});
         }
         res.status(200).send({todos});
         

    }).catch((e) => {
        return res.status(400).send({});  
    })
});


app.get('/users/:id',(req,res) => {
    var id = req.params.id;
    if (! ObjectID.isValid(id)) {
      return  res.status(404).send({});
    }

    User.findById(id).then((todos) => {
        if ( !todos ) {
           return res.status(404).send({})
        }
        res.send({todos});
    }).catch((e) => {
          res.status(400).send({});
    });
});



app.get('/users/me', authenticate , (req,res) => {
    res.send(req.user);
});


app.post('/users/login',(req,res) => {

        let body = _.pick( req.body, ['email', 'password'] );
        User.findByCredentials(body.email, body.password).then((user) => {
           // res.send(user);
            return user.generateAuthToken().then((token) => {
                res.header('x-auth',token).send(user);
            });

        }).catch((e) => {
            res.status(400).send();
        });
});

app.delete('/users/me/token', authenticate, (req,res) => {

    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    },() => {
        res.status(400).send();
    });
});




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