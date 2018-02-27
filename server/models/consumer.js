const mongoosastic = require('mongoosastic');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;



var CommentSchema = new Schema({
    title: String
  , body: String
  , author: String
});

var Comment = mongoose.model('Comment', CommentSchema )
 
 
var ConsumerSchema = new Schema({
    name: {type:String, es_indexed:true},
    email: {type: String, es_indexed: true},
    city: String,
    comments: {type: Schema.Types.ObjectId, ref: 'Comment',
    es_schema: Comment, es_indexed:true, es_select: 'title body'}
});

 
ConsumerSchema.plugin(mongoosastic, {
    hosts: [
        'localhost:9200',    
    ],
    populate: [
        {path: 'comments', select: 'title body'}
    ]
});

var Consumer  =  mongoose.model('Consumer', ConsumerSchema);
module.exports = { Consumer , Comment }