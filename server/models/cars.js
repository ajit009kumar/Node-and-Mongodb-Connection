const mongoosastic = require('mongoosastic');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CarSchema = new Schema({
    maker: {type: String,  es_indexed:true , es_type: 'text' },
    price_eur: {type: Number,  es_indexed:true , es_type: 'integer'}
});

// var client = new elasticsearch.Client();
// var client = elasticsearch.Client({
//     hosts: [
//         'localhost:9200',
//     ]
//   });

CarSchema.plugin(mongoosastic,{
    hosts: [
        'localhost:9200',    
    ],
    'type': 'sold_cars',
    'index': 'cars'
     
});

var Car = mongoose.model('Car', CarSchema);
module.exports = { Car };