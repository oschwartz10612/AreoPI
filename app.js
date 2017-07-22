const express = require('express');
const app = express();
const fs = require('fs');

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/chart', express.static(__dirname + '/node_modules/chartjs/dist/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/icon', express.static(__dirname + '/views/'));
app.use('/style', express.static(__dirname + '/views/'));
app.use('/main', express.static(__dirname + '/'));
app.use('/data', express.static(__dirname + '/data/'));

//This is just a test
var data = JSON.parse(fs.readFileSync(__dirname + '/data/data.json', 'utf8'));

app.get('/', function(req, res) {
  res.render('index.html');
});

app.get('/settings', function(req, res) {
  res.render('settings.html');
});

app.listen(4000, function() {
  console.log('Listening on port 4000!');
});
