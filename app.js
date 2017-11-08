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
  console.log(req.body.timingOption4);
  console.log(req.body.timingOption5);
  console.log(req.body.interval);
  console.log(req.body.secounds);
  var file = __dirname + '/data/settings.json';
  jsonfile.readFile(file, function(err, obj) {
    obj.sprayer.morning = (req.body.timingOption1 === "true");
    obj.sprayer.night = (req.body.timingOption2 === "true");
    obj.sprayer.day = (req.body.timingOption4 === "true");
    if (req.body.secounds > 0) {
      obj.sprayer.sprayTime = parseInt(req.body.secounds);
    }
    if (req.body.interval > 0) {
      obj.sprayer.sprayInterval = parseInt(req.body.interval);
    }
    jsonfile.writeFile(file, obj);
  });
});

app.post('/api/settings/despensing', function(req, res) {
  console.log("----------------------");
  var file = __dirname + '/data/settings.json';
  jsonfile.readFile(file, function(err, obj) {
    if (req.body.flora > 0) {
      console.log(req.body.flora);
      obj.nutrents.floraAmount = parseInt(req.body.flora);
    }
    if (req.body.grow > 0) {
      console.log(req.body.grow);
      obj.nutrents.growAmount = parseInt(req.body.grow);
    }
    if (req.body.bloom > 0) {
      console.log(req.body.bloom);
      obj.nutrents.bloomAmount = parseInt(req.body.bloom);
    }
    if (req.body.time != undefined) {
      console.log(req.body.time);
      obj.nutrents.time = req.body.time;
    }
    if (req.body.day != undefined) {
      console.log(req.body.day);
      obj.nutrents.day = req.body.day;
    }

    if (req.body.option1 == "true") {
      console.log(req.body.option1);
      obj.nutrents.time = "5:00 PM";
      obj.nutrents.day = "Sunday";
    }
    if (req.body.option2 == "true") {
      console.log(req.body.option2);
      obj.nutrents.time = "5:00 PM";
      obj.nutrents.day = "Wensday";
    }
    if (req.body.option3 == "true") {
      console.log(req.body.option3);
      obj.nutrents.time = "5:00 PM";
      obj.nutrents.day = "Wensday, Sunday";
    }
    if (req.body.option4 == "true") {
      console.log(req.body.option4);
      obj.nutrents.time = "5:00 PM";
      obj.nutrents.day = "all";
    }
    jsonfile.writeFile(file, obj);
  });
});

app.post('/api/settings/ph', function(req, res) {
  console.log(req.body.ph);
  var file = __dirname + '/data/settings.json';
  jsonfile.readFile(file, function(err, obj) {
    obj.phTarget = parseInt(req.body.ph);
    jsonfile.writeFile(file, obj);
  });
});

app.post('/api/settings/notifcations', function(req, res) {
  console.log("------------------");
  console.log(req.body.notifcationOption1);
  console.log(req.body.notifcationOption3);
  console.log(req.body.notifcationOption4);
  console.log(req.body.notifcationOption5);
  console.log(req.body.notifcationOption6);
  console.log(req.body.name);
  console.log(req.body.email);
  var file = __dirname + '/data/settings.json';
  jsonfile.readFile(file, function(err, obj) {
    obj.notifcations.notifcationOption1 = (req.body.notifcationOption1 === "true");
    obj.notifcations.notifcationOption3 = (req.body.notifcationOption3 === "true");
    obj.notifcations.notifcationOption4 = (req.body.notifcationOption4 === "true");
    obj.notifcations.notifcationOption5 = (req.body.notifcationOption5 === "true");
    obj.notifcations.notifcationOption6 = (req.body.notifcationOption6 === "true");
    if(req.body.name != "") {
      obj.notifcations.notificationName = req.body.name;
    }
    if(req.body.email != "") {
      obj.notifcations.notificationEmail = req.body.email;
    }
    jsonfile.writeFile(file, obj);
  });
});

app.post('/api/settings/wifi', function(req, res) {
  console.log(req.body.ssid);
  console.log(req.body.password);
  var file = __dirname + '/data/settings.json';
  jsonfile.readFile(file, function(err, obj) {
    obj.wifi.newSSID = req.body.ssid;
    obj.wifi.newPSK = req.body.password;
    jsonfile.writeFile(file, obj);
  });
});

app.post('/api/sprayer', function(req, res) {
  if (req.body.sprayer == "on") {
    console.log("Turn on Sprayer");
    port.write("sprayer");
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

//------End Website------//

const SerialPort = require('serialport');
const port = new SerialPort('/dev/cu.usbmodem14241');
const Readline = SerialPort.parsers.Readline;
const parser = new Readline();
port.pipe(parser);

port.on('open', () => {
  console.log('Port Opened');
});

parser.on('data', function(data) {
  var obj = JSON.parse(data);
  if (obj.data = "test") {
    console.log(obj.payload);
  }
});

//------Main Process------//
var counter = 0;
function intervalFunc() {

}
setInterval(intervalFunc, 500);
