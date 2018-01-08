
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,db) => {
        if ( error ) {
          return console.log('Unable to connect to db');
        }
        console.log('connected to the db');
        // db.collection('Todos').findOneAndUpdate({
        //     _id: new ObjectID('5a536497dc12c0c9753cf995')
        // },{
        //     $set: {completed: false}
        // },{
        //     returnOriginal: false
        // }).then((res) => {
        //     console.log(res);
        // });

        db.collection('Users').findOneAndUpdate({
          _id: new ObjectID('5a538423fb39843b105da006')
        },

        {

            $set: {name: 'Jane'}, 
            $inc: {age: 1}
       },
        
        {
            returnOriginal: false
        }).then((res)=> {
            console.log(res);
        });
});