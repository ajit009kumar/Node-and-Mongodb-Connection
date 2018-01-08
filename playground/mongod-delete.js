const { MongoClient , ObjectID } = require('mongodb');
let obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,db) => {
    if(error) {
        return console.log('unable to connect to the database');
    }
    console.log('connected to the dataBase');
    db.collection('Users').deleteMany({name: "Ajeet kumar"}).then((res) => {
            console.log(res);
    });

    db.collection('Users').deleteOne({name: 'Ajeet kumar'}).then((res) => {
        console.log(res);
    });

    db.collection('Todos').findOneAndDelete({completed: false}).then((res) => {
            console.log(res);
    });

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5a538401ce03b81d6cf9609a')
    }).then((res) => {
        console.log(res);
    });

});
