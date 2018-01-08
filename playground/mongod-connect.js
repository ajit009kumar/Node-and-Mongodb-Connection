
//const MongoClient = require('mongodb').MongoClient;

const { MongoClient , ObjectID } = require('mongodb');
let obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,db) => {
    if(error) {
        return console.log('unable to connect to the database');
    }
    console.log('connected to the dataBase');
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false 

    // },(error,result) => {
    //     if ( error ) {
    //         return console.log('unable to insert to the todos');
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });


    db.collection('Users').insertOne({
        name: 'Amit kumar',
        age: 25,
        location: 'Bengaluru'
    },(error,result) => {
         if ( error ) {
             return console.log('Unable to connect');
         }
         console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2));
    });

    // db.close();
});

