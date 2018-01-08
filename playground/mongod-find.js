const { MongoClient , ObjectID } = require('mongodb');
let obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,db) => {
    if(error) {
        return console.log('unable to connect to the database');
    }
    console.log('connected to the dataBase');
    db.collection('Todos').find().toArray().then((docs) => {
            console.log(docs);
    },(error) => {
        console.log('unable to find');
    });

    db.collection('Todos').find({completed: false}).count().then((count) => {
        console.log(`count is: ${count}`);
       },(error) => {
        console.log('unable to find');
    });

});