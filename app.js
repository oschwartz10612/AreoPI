const express = require('express');
const app = express();
const fs = require('fs');
var bodyParser = require('body-parser');

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//Main Process
//var data = JSON.parse(fs.readFileSync(__dirname + '/data/data.json', 'utf8'));

//api:
app.post('/api/sprayer', function(req, res) {
  if (req.body.sprayer == "on") {
    console.log("Turn on Sprayer");
  }
});

app.post('/api/nutrents', function(req, res) {
  console.log(req.body.flora);
  console.log(req.body.grow);
  console.log(req.body.bloom);
});

app.post('/api/ph', function(req, res) {
  console.log(req.body.ph);
});

//Renderer:
app.get('/', function(req, res) {
  res.render('index.html');
});

app.get('/settings', function(req, res) {
  res.render('settings.html');
});

app.listen(4000, function() {
  console.log('Listening on port 4000!');
});
