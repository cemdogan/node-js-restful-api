var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

var db = mongoose.connect('mongodb://localhost/bookapi');

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
bookRouter = require('./Routes/bookRoutes')(Book);
            
app.use('/api/books', bookRouter);

app.get('/', function(req, res){
    res.send("Welcome");    
});

app.listen(port, function(){
    console.log("running port " + port);
});