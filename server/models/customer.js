
const mongoosastic = require('mongoosastic');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CustomerSchema = new Schema ({
    name: { type: String, es_indexed:true , es_type: 'text' },
    price: Number,
    email: {type: String, es_indexed:true , es_type: 'text' }
});

CustomerSchema.plugin(mongoosastic,{
    hosts: [
        'localhost:9200'
    ],
    'type': 'doc' 
});

var Customer =  mongoose.model('Customer', CustomerSchema);
module.exports = { Customer }