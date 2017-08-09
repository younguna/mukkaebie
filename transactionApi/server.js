let express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Models = require('./api/models/mkbModel'),
  bodyParser = require('body-parser'),
  cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mkb', {useMongoClient:true,});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    next();
});

출처: http://m.mkexdev.net/339 [박종명의 아름다운 개발 since 2010.06]


var routes = require('./api/routes/mkbRoutes');
routes(app);


app.listen(port);


console.log('Mukkaebie RESTful API server started on: ' + port);