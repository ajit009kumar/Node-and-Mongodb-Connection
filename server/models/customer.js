
const mongoosastic = require('mongoosastic');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CustomerSchema = new Schema ({
    name: String,
    price: Number,
    email: String,
    
});

CustomerSchema.plugin(mongoosastic,{
    hosts: [
        'localhost:9200'
    ] 
});

var Customer =  mongoose.model('Customer', CustomerSchema);
module.exports = { Customer }