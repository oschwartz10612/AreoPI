window.onload = dashboard();

function dashboard() {
  var heading = document.getElementById('heading');
  heading.innerHTML = 'Dashboard';
  var content = document.getElementById('content');
  content.innerHTML = `
                        <h3 class="text-center">Ph Values</h3>
                        <canvas id="myPH" width="200" height="100"></canvas>
                        <h3 class="text-center">EC Values</h3>
                        <canvas id="myEC" width="200" height="100"></canvas>
                        <h3 class="text-center">Tempatures</h3>
                        <canvas id="myTemps" width="200" height="100"></canvas>`;
  var ctx = document.getElementById("myPH");
  var data1 = [12, 21, 52, 75];
  var lables1 = ["1", "2", "3", "4"];
  var myPH = new Chart(ctx, {
    type: 'line',
    data: {
      labels: lables1,
      datasets: [{
        label: 'PH value',
        data: data1,
        fill: false,
        backgroundColor: [
          '#A31621',
        ],
        borderColor: [
          '#5E1621',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  var ctx = document.getElementById("myEC");
  var myEC = new Chart(ctx, {
    type: 'line',
    data: {
      labels: lables1,
      datasets: [{
        label: 'EC value',
        data: data1,
        fill: false,
        backgroundColor: [
          '#1F7A8C',
        ],
        borderColor: [
          '#005060',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  var ctx = document.getElementById("myTemps");
  var myTemps = new Chart(ctx, {
    type: 'line',
    data: {
      labels: lables1,
      datasets: [{
        label: 'Tempatures',
        data: data1,
        fill: false,
        backgroundColor: [
          '#E3B505',
        ],
        borderColor: [
          '#776002',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function changePH() {
  var heading = document.getElementById('heading');
  heading.innerHTML = 'PH';
  var content = document.getElementById('content');
  content.innerHTML = `
                        <canvas id="myChart" width="300" height="150"></canvas>
                        <form class="form-inline" id="ph-form">
                          <div class="form-group">
                            <label class="sr-only" for="exampleInputAmount">Amount (in dollars)</label>
                            <div class="input-group">
                              <div class="input-group-addon"><span class="glyphicon glyphicon-tint" aria-hidden="true"></span></div>
                                <input type="text" class="form-control" id="phAmount" placeholder="Amount">
                              <div class="input-group-addon">ml</div>
                            </div>
                          </div>
                          <button type="submit" class="btn btn-primary">Add</button>
                          <div id="phAlert" class="input-group"></div>
                        </form>
                      `;
  var phForm = document.getElementById('ph-form');
  phForm.addEventListener("submit", addPH);
  var data1 = [];
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [""],
      datasets: [{
        label: 'PH value',
        data: data1,
        fill: false,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function addPH(e) {
  if (e.preventDefault) e.preventDefault();
  var phAmount = document.getElementById('phAmount')
  if (phAmount.value != '' && parseInt(phAmount.value)) {
    document.getElementById('phAlert').innerHTML = '<div class="alert alert-success" id="formAlert" role="alert"><bold>Sucsess!</bold>' + phAmount.value + 'ml of PH up added.</div>';
  } else {
    alert("Please enter a valid PH amount");
  }
  return false;
}

function changeEC() {
  var heading = document.getElementById('heading');
  heading.innerHTML = 'PPM and Nutrents';
  var content = document.getElementById('content');
  content.innerHTML = `
                        <canvas id="myChart" width="300" height="150"></canvas>
                        <form class="form-inline" id="ec-form">
                          <div class="form-group">
                            <label class="sr-only" for="exampleInputAmount">Amount (in dollars)</label>
                            <div class="input-group">
                              <div class="input-group-addon"><span class="glyphicon glyphicon-tint" aria-hidden="true"></span></div>
                                <input type="text" class="form-control" id="growAmount" placeholder="Grow Amount">
                                <input type="text" class="form-control" id="floraAmount" placeholder="Flora Amount">
                                <input type="text" class="form-control" id="bloomAmount" placeholder=" Bloom Amount">
                              <div class="input-group-addon">ml</div>
                            </div>
                          </div>
                          <button type="submit" class="btn btn-primary">Add</button>
                          <div id="ecAlert" class="input-group"></div>
                        </form>
                      `;
  var phForm = document.getElementById('ec-form');
  phForm.addEventListener("submit", addEC);
  var data1 = [];
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [""],
      datasets: [{
        label: 'EC value',
        data: data1,
        fill: false,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function addEC(e) {
  if (e.preventDefault) e.preventDefault();
  var floraAmount = document.getElementById('floraAmount');
  var bloomAmount = document.getElementById('bloomAmount');
  var growAmount = document.getElementById('growAmount');
  if (parseInt(floraAmount.value) >= 0 && parseInt(bloomAmount.value) >= 0 && parseInt(floraAmount.value) >= 0) {
    document.getElementById('ecAlert').innerHTML = '<div class="alert alert-success" id="formAlert" role="alert"><bold>Sucsess!</bold> ' + floraAmount.value + 'ml of Flora added, ' + growAmount.value + 'ml of Grow added, and ' + bloomAmount.value + 'ml of Bloom added.</div>';
  } else {
    alert("Please enter a valid nutrent amount");
  }
  return false;
}

function viewTemp() {
  var heading = document.getElementById('heading');
  heading.innerHTML = 'Tempatures';
  var content = document.getElementById('content');
  content.innerHTML = '<canvas id="myChart" width="300" height="150"></canvas>';
  var data1 = [];
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [""],
      datasets: [{
        label: 'Tempatures',
        data: data1,
        fill: false,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function viewWater() {
  var heading = document.getElementById('heading');
  heading.innerHTML = 'Water Levals';
  var content = document.getElementById('content');
  content.innerHTML = `
                        <h3 class="text-center">Tank One:</h3>
                        <div class="progress">
                          <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
                            <span class="sr-only">60% Complete</span>
                          </div>
                        </div>
                        <h3 class="text-center">Tank Two:</h3>
                        <div class="progress">
                          <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
                            <span class="sr-only">60% Complete</span>
                          </div>
                        </div>
                        <canvas id="myChart" width="300" height="150"></canvas>
                        <button type="button" name="button" class="btn main-color"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span>Manage Notifcations</button>`;
  var data1 = [];
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            data: [20, 50, 100, 75, 25, 0],
            label: 'Tank One',

            // This binds the dataset to the left y axis
            yAxisID: 'left-y-axis',
            backgroundColor: [
              '#1B4965',
            ],
            borderColor: [
              '#133549',
            ],
            fill: false
        }, {
            data: [0.1, 0.5, 1.0, 2.0, 1.5, 0],
            label: 'Tank Two',

            // This binds the dataset to the right y axis
            yAxisID: 'right-y-axis',

            backgroundColor: [
              '#42CAFD',
            ],
            borderColor: [
              '#236E89',
            ],
            fill: false
        }],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    options: {
        scales: {
            yAxes: [{
                id: 'left-y-axis',
                type: 'linear',
                position: 'left'
            }, {
                id: 'right-y-axis',
                type: 'linear',
                position: 'right'
            }]
        }
    }
  });
}
