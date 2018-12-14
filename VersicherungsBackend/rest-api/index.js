var express = require('express'),
    app = express(),
    port = 3001,
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./routes');
routes(app);

app.listen(port);

console.log('RESTful API server started on port: ' + port);