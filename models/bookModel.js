var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var bookModel = new Schema({
    title: 'string',
    genre: 'string',
    author: 'string'    
});

bookModel.set('collection','Book');
module.exports = mongoose.model('Book', bookModel);