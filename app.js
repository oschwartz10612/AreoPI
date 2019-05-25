const express = require('express'); //this is a work in progress; check back for future this is a test!
const app = express();
var jsonfile = require('jsonfile')
var bodyParser = require('body-parser');

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/chart', express.static(__dirname + '/node_modules/chart.js/dist/'));
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

app.post('/api/sprayer', function(req, res) {
  if (req.body.sprayer == "on") {
    var file = __dirname + '/data/settings.json';
    jsonfile.readFile(file, function(err, obj) {
      console.log("Turn on Sprayer");
      console.log("{\"pump\":\"MAIN\",\"sleep\":" + obj.sprayer.sprayTime + "}");
      pumps.write("{\"pump\":\"MAIN\",\"sleep\":" + obj.sprayer.sprayTime + "}");
    });
  }
});

app.post('/api/nutrents', function(req, res) {
  console.log(req.body.grow);
  console.log(req.body.flora);
  console.log(req.body.bloom);

  var file = __dirname + '/data/settings.json';
  jsonfile.readFile(file, function(err, obj) {

    pumps.write("{\"GROW\":" + req.body.grow * obj.nutrents.multiplyer +
    ", \"FLORA\":" + req.body.flora * obj.nutrents.multiplyer +
    ", \"BLOOM\":" + req.body.bloom * obj.nutrents.multiplyer +
    ", \"MAIN\":10" +
    ", \"PH\":0}");

  });
});



app.post('/api/ph', function(req, res) {
  console.log(req.body.ph);

  var file = __dirname + '/data/settings.json';
  jsonfile.readFile(file, function(err, obj) {

    pumps.write("{\"GROW\":0" +
    ", \"FLORA\":0" +
    ", \"BLOOM\":0" +
    ", \"MAIN\":1" +
    ", \"PH\":" + req.body.ph * obj.nutrents.multiplyer + "}");

  });
});

//Renderer:
app.get('/', function(req, res) {
  res.render('index.html');
});

app.get('/settings', function(req, res) {
  res.render('settings.html');
});

app.listen(3000, function() {
  console.log('Listening on port 3000!');
});
//------End Website------//

//------Serial------//
//------Pumps------//
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;

const pumps = new SerialPort('/dev/arduino0'); //Change to match correct port
const pumpsparser = new Readline();
pumps.pipe(pumpsparser);

pumps.on('open', () => {
  console.log('Port Opened With Pumps');
  setInterval(pumpsProcess, 10000);
  console.log('Pumps Process Started');

});

pumps.on('close', () => {
  console.log('Port Closed With Pumps');
  clearInterval(pumpsProcess);
  console.log('Error: Pumps Process Ended! Reconnect and restart!');
});

pumpsparser.on('data', function(data) {
  console.log(data);
});

//------Ec------//
const ec = new SerialPort('/dev/arduino1'); //Change to match correct port
const ecparser = new Readline();
ec.pipe(ecparser);

ec.on('open', () => {
  console.log('Port Opened With Ec Sensor');
});

ec.on('close', () => {
  console.log('Port Closed With Ec Sensor');
});

var lastDay;
ecparser.on('data', function(data) {
  console.log(data);
  var ecData = JSON.parse(data);

  var d = new Date();

  if (lastDay != d.getDay()) {
    var file = __dirname + '/data/data.json';
    jsonfile.readFile(file, function(err, obj) {


      obj.ec[d.getDay()] = parseFloat(ecData.ec);
      obj.tempatures[d.getDay()] = parseFloat(ecData.temperature); //going to have to multiply below by the amount of space we have
      obj.water.tank[d.getDay()] = parseFloat(ecData.in);
      obj.water.tankCurrent = parseFloat(ecData.in);

      lastDay = d.getDay();

      jsonfile.writeFile(file, obj);
    });
  }
});

//-----PH-----//
const ph = new SerialPort('/dev/phSensor'); //Change to match correct port

const phparser = ph.pipe(new Readline({ delimiter: '\r' }));

ph.on('open', () => {
  console.log('Port Opened With ph Sensor');
});

ph.on('close', () => {
  console.log('Port Closed With ph Sensor');
});

var lastDayph;

var cooldown = 0;

phparser.on('data', function(data) {
  //console.log(parseFloat(data));
  if(cooldown != 0) {
    cooldown--;
  }

  var d = new Date();

  if (lastDayph != d.getDay()) {
    if (parseFloat(data) > 0) {
      var file = __dirname + '/data/data.json';
      jsonfile.readFile(file, function(err, obj) {

      var d = new Date();
      obj.ph[d.getDay()] = parseFloat(data);

      lastDayph = d.getDay();

      jsonfile.writeFile(file, obj);
    });
   }
  }
  var newFile = __dirname + '/data/settings.json';
  jsonfile.readFile(newFile, function(err, obj) {
    if (obj.phTarget > (parseFloat(data) + 1.5) || obj.phTarget < (parseFloat(data) - 1.5)) {
      if(cooldown == 0) {
        console.log("phAdded");
        pumps.write("{\"GROW\":0" +
        ", \"FLORA\":0" +
        ", \"BLOOM\":0" +
        ", \"MAIN\":1" +
        ", \"PH\":" + obj.phAdjustment * obj.nutrents.multiplyer + "}");
        cooldown = 120;
      }
    }
  });
});
//-----End Serial------//

//------Begin Pumps------//
var triggered = false;
var toggle = false;
var timeout = 0;
function pumpsProcess() {
  var file = __dirname + '/data/settings.json';
  jsonfile.readFile(file, function(err, obj) {
    if (obj.nutrents.day == getDay() && obj.nutrents.time == getHour() && triggered == false) {
      triggered = true;
      pumps.write("{\"GROW\":" + req.body.grow * obj.nutrents.multiplyer +
      ", \"FLORA\":" + req.body.flora * obj.nutrents.multiplyer +
      ", \"BLOOM\":" + req.body.bloom * obj.nutrents.multiplyer +
      ", \"MAIN\":1" +
      ", \"PH\":0}");
    }
    if (obj.nutrents.day != getDay() || obj.nutrents.time != getHour()) {
      triggered = false;
    }

    if (obj.sprayer.day == true) {
      pumps.write("{\"GROW\":0" +
      ", \"FLORA\":0" +
      ", \"BLOOM\":0" +
      ", \"MAIN\":0" +
      ", \"PH\":0}");
    }

    if (obj.sprayer.morning == true) {
      var d = new Date();
      if (d.getHours() >= 5 && d.getHours() <= 8 && toggle == false) {
        pumps.write("{\"GROW\":0" +
        ", \"FLORA\":0" +
        ", \"BLOOM\":0" +
        ", \"MAIN\":0" +
        ", \"PH\":0}");
          toggle == true;
      }
      else {
        toggle = false;
        pumps.write("{\"GROW\":0" +
        ", \"FLORA\":0" +
        ", \"BLOOM\":0" +
        ", \"MAIN\":1" +
        ", \"PH\":0}");
      }
    }

    if (obj.sprayer.night == true) {
      var d = new Date();
      if (d.getHours() >= 17 && d.getHours() <= 20 && toggle == false) {
        pumps.write("{\"GROW\":0" +
        ", \"FLORA\":0" +
        ", \"BLOOM\":0" +
        ", \"MAIN\":0" +
        ", \"PH\":0}");
          toggle == true;
      }
      else {
        toggle = false;
        pumps.write("{\"GROW\":0" +
        ", \"FLORA\":0" +
        ", \"BLOOM\":0" +
        ", \"MAIN\":1" +
        ", \"PH\":0}");
      }
    }

    timeout--;
    if (obj.sprayer.night == false && obj.sprayer.morning == false && obj.sprayer.day == false && timeout == 0) {
      setInterval(spray, obj.sprayer.sprayInterval);
      timeout == 3600;
    }
    else {
      clearInterval(spray)
    }

  });
}
//------End Pumps------//

//------Begin Sprayer------//

function spray() {
  var newFile = __dirname + '/data/settings.json';
  jsonfile.readFile(newFile, function(err, obj) {
    pumps.write("{\"GROW\":0" +
    ", \"FLORA\":0" +
    ", \"BLOOM\":0" +
    ", \"MAIN\":" + obj.sprayer.sprayTime +
    ", \"PH\":0}");
  });
}

//------End Sprayer------//

function getHour() {
  var d = new Date();
  var hour = new Array(24);
  hour[0] = "12:00 AM";
  hour[1] = "1:00 AM";
  hour[2] = "2:00 AM";
  hour[3] = "3:00 AM";
  hour[4] = "4:00 AM";
  hour[5] = "5:00 AM";
  hour[6] = "6:00 AM";
  hour[7] = "7:00 AM";
  hour[8] = "8:00 AM";
  hour[9] = "9:00 AM";
  hour[10] = "10:00 AM";
  hour[11] = "11:00 AM";

  hour[12] = "12:00 PM";
  hour[13] = "1:00 PM";
  hour[14] = "2:00 PM";
  hour[15] = "3:00 PM";
  hour[16] = "4:00 PM";
  hour[17] = "5:00 PM";
  hour[18] = "6:00 PM";
  hour[19] = "7:00 PM";
  hour[20] = "8:00 PM";
  hour[21] = "9:00 PM";
  hour[22] = "10:00 PM";
  hour[23] = "11:00 PM";
  return hour[d.getHours()];
}

function getDay(day) {
  var d = new Date();
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  return weekday[d.getDay()];
}
