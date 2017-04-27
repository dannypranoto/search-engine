var config     = require('./gulpfile.config.js')[process.env.NODE_ENV || 'development'];

var express    = require('express');
var path       = require('path');
var url        = require('url');
var app        = express();

console.log(config.ENV.name);
app.use(config.ENV.baseUrl, express.static(path.join(__dirname, config.ENV.name)));

app.get('/', function(req, res) {res.redirect(config.ENV.baseUrl);});

app.listen(config.ENV.port, function () {
  console.log('listening on port', config.ENV.port);
});

module.exports = app;
