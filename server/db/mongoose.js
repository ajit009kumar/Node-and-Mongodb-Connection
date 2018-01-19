var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/test';


mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
// var conn = MongoClient.connect(url, function(err, db) {
//     var adminDb = db.admin();
//     adminDb.serverStatus(function(err, info) {
//         console.log(info.version);
//     })
// })


module.exports = {
    mongoose
}