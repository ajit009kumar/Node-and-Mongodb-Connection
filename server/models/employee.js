
const mongoosastic = require('mongoosastic');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var EmployeeSchema = new Schema ({
    name: { type: String, es_indexed:true , es_type: 'text' },
    email: {type: String, es_indexed:true , es_type: 'keyword' },
    age: {type: Number,es_indexed:true, es_type: 'long'},
    salary: {type: Number, es_indexed: true,es_type: 'long'},
    state: {type: String,es_indexed:true,es_type:'text'},
    designation: {type:String}
});

EmployeeSchema.plugin(mongoosastic,{
    hosts: [
        'localhost:9200'
    ], 
    'type': 'doc' 
});

var Employee =  mongoose.model('Employee', EmployeeSchema);
module.exports = { Employee }