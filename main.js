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
    document.getElementById('phAlert').innerHTML = '<div class="alert alert-success" id="formAlert" role="alert"><bold>Sucsess!</bold>'+phAmount.value+'ml of PH up added.</div>';
  }
  else {
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
    document.getElementById('ecAlert').innerHTML = '<div class="alert alert-success" id="formAlert" role="alert"><bold>Sucsess!</bold> '+floraAmount.value+'ml of Flora added, '+growAmount.value+'ml of Grow added, and '+bloomAmount.value+'ml of Bloom added.</div>';
  }
  else {
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
