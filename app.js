const express = require('express');
const app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/chart', express.static(__dirname + '/node_modules/chartjs/dist/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/icon', express.static(__dirname + '/views/'));
app.use('/style', express.static(__dirname + '/views/'));
app.use('/main', express.static(__dirname + '/'));

//This is just a test
app.get('/api', function(req, res) {
  res.send('{"state": "false"}');
});

app.get('/', function(req, res) {
  res.render('index.html');
});

app.get('/monitor', function(req, res) {
  res.render('monitor.html');
});

app.get('/settings', function(req, res) {
  res.render('settings.html');
});

app.listen(3000, function() {
  console.log('Listening on port 3000!');
});
