const mongoosastic = require('mongoosastic');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductSchema = new Schema({
    product_name: {type: String,  es_indexed:true , es_type: 'text' },
    price: {type: Number,  es_indexed:true , es_type: 'float'}
});

ProductSchema.plugin(mongoosastic,{
    hosts: [
        'localhost:9200',    
    ],
    'type': 'doc',
     
});

var Product = mongoose.model('Product', ProductSchema);
module.exports = { Product };

