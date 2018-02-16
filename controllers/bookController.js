var Book = require("../models/bookModel");

var bookController = {
  // handles a get request for the list views
  getList: function(req, res){
  // get all documents from books collection in database
    Book.find(function(err, books){
      if (err){ return res.status(500).send("ERROR")};
  //render the view with the data
      res.render("list", {
        books:books
      });
    })
  },

  // handles request for addNew form
  getNew: function(req, res){
    res.render("addNew", {status: false});
  },

 //handles form submission and saves to database
  postNew: function(req, res){

    // creating new object from model
    var newBook = new Book(req.body);

    // saving to database
    newBook.save(function(err, newBook){
      if (err){ return res.status(500).render("addNew", {status:"error"}); };
      res.status(201).render("addNew",{status:"success"});
    });
  },

  // handle get request for the detail views
  getDetail: function(req, res){
    Book.findById(req.params.id, function(err, book){
      if (err){ return res.status(500).send("ERROR")};
      res.render("detail", {
        book:book
      });
    })
  }

};

module.exports = bookController;
