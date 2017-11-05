var express = require("express");

var routes = function(Book){
    var bookRouter = express.Router();
    bookRouter.route('/')
                .post(function(req,res){
                    var book = new Book(req.body);
                    book.save();
                    res.status(201).send(book);
                })
                .get(function(req, res){
    
                    var query = {};
                    if(req.query.genre){
                        query.genre = req.query.genre;
                    }
    
                    if(req.query.author){
                        query.author = req.query.author;
                    }
    
                    Book.find(query, function(err,data){
                        if(err){
                            res.status(500),send(err);
                        }else{
                            res.json(data);
                        }
                    });                
                });
    bookRouter.use('/:Id', function(req,res,next){
        Book.findById(req.params.Id, function(err, book){
            if(err)
                res.statusCode(500).send(err);
            else if(book){
                req.book = book;
                next();
            }else{
                res.status(404).send("book not found");
            }
        });
    })
    bookRouter.route('/:Id').get(function(req,res){
            res.json(req.book)
    })
    .put(function(req,res){
        req.book.title = req.body.title;
        req.book.genre = req.body.genre;
        req.book.author = req.body.author;
        req.book.save(function(err){
            if(err){
                res.statusCode(500).send(err);
            }else{
                res.json(req.book);
            }
        })        
    })
    .patch(function(req,res){
        if(req.body._id)
            delete req.body._id;

        for(var i in req.body)
        {
            req.book[i] = req.body[i];
        }
        req.book.save(function(err){
            if(err){
                res.statusCode(500).send(err);
            }else{
                res.json(req.book);
            }
        }) 
    })
    .delete(function(req,res){
            req.book.remove(function(err){
                if(err){
                    res.statusCode(500).send(err);
                }else{
                    res.status(204).send("Removed");
                }
            })
    });

    return bookRouter;
};

module.exports = routes;