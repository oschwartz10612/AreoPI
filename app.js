const express = require('express');
const app = express();
var jsonfile = require('jsonfile')
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

//api:
app.post('/api/settings/timing', function(req, res) {
  console.log("----------------------");
  console.log(req.body.timingOption1);
  console.log(req.body.timingOption2);
  console.log(req.body.timingOption3);
  console.log(req.body.timingOption4);
  console.log(req.body.timingOption5);
  if (req.body.secounds > 0) {
    console.log(req.body.secounds);
  }
  if (req.body.interval > 0) {
    console.log(req.body.interval);
  }
  // var file = __dirname + '/data/settings.json';
  // jsonfile.readFile(file, function(err, obj) {
  //   obj.sprayer = "on";
  //   jsonfile.writeFile(file, obj);
  // });
});

app.post('/api/settings/despensing', function(req, res) {
  console.log("----------------------");
  console.log(req.body.option1);
  console.log(req.body.option2);
  console.log(req.body.option3);
  console.log(req.body.option4);
  if (req.body.flora > 0) {
    console.log(req.body.flora);
  }
  if (req.body.grow > 0) {
    console.log(req.body.grow);
  }
  if (req.body.bloom > 0) {
    console.log(req.body.bloom);
  }
  if (req.body.time != "") {
    console.log(req.body.time);
  }
  if (req.body.day != "") {
    console.log(req.body.day);
  }
  // var file = __dirname + '/data/settings.json';
  // jsonfile.readFile(file, function(err, obj) {
  //   obj.sprayer = "on";
  //   jsonfile.writeFile(file, obj);
  // });
});

app.post('/api/settings/ph', function(req, res) {
  console.log(req.body.ph);
  // var file = __dirname + '/data/settings.json';
  // jsonfile.readFile(file, function(err, obj) {
  //   obj.sprayer = "on";
  //   jsonfile.writeFile(file, obj);
  // });
});

app.post('/api/settings/wifi', function(req, res) {
  console.log(req.body.ssid);
  console.log(req.body.password);
  // var file = __dirname + '/data/settings.json';
  // jsonfile.readFile(file, function(err, obj) {
  //   obj.sprayer = "on";
  //   jsonfile.writeFile(file, obj);
  // });
});

app.post('/api/settings/notifcations', function(req, res) {
  console.log("------------------");
  console.log(req.body.notifcationOption1);
  console.log(req.body.notifcationOption2);
  console.log(req.body.notifcationOption3);
  console.log(req.body.notifcationOption4);
  console.log(req.body.notifcationOption5);
  console.log(req.body.notifcationOption6);
  // var file = __dirname + '/data/settings.json';
  // jsonfile.readFile(file, function(err, obj) {
  //   obj.sprayer = "on";
  //   jsonfile.writeFile(file, obj);
  // });
});

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
