// Import modules
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var bookController = require('./controllers/bookController');

// Open database connection
var mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl, {useMongoClient: false}, function(err){
  console.log(mongoUrl)

  if(err) return console.log(err);
  console.log("DB connection opened");
})

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set public directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

// Assign controllers to routes
// app.get('list:id', function(req, res){
//   res.render('list', {
//   books:books
//   });
// });

app.get("/detail/:id", bookController.getDetail);

app.get('/addnew', bookController.getNew);

app.post('/addnew/submit', bookController.postNew);

app.get('/', bookController.getList);

// Make this file accessible as an import
module.exports = app;

var port = normalizePort(process.env.PORT || '6000');
app.set('port', port);

app.listen(port, function(){
  console.log("Server is running");
});
