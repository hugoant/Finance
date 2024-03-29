function change(chart1, chart2){
  var apport = parseInt(document.getElementById('apport_init_id').value);
  var rendement = parseFloat(document.getElementById('rendement_id').value)/100;
  var apport_mensuel = parseFloat(document.getElementById('apport_mensuel_id').value);
  var annee_init = parseInt(document.getElementById('annee_init_id').value);
  var nombre_annees = parseInt(document.getElementById('nombre_annees_id').value);
  [chart1.data.labels, chart1.data.datasets[0].data, chart2.data.datasets[0].data, chart1.data.datasets[1].data] = calcul(apport, annee_init, rendement, apport_mensuel, nombre_annees, chart1.data.datasets.data, chart1.data.labels, chart2.data.datasets.data);
  chart2.data.labels = chart1.data.labels;
  chart1.update();
  chart2.update();

  document.getElementById("salaire_id").innerHTML = calcul_salaire(chart2, nombre_annees);
  document.getElementById("argent_id").innerHTML = calcul_argent_place(chart1, nombre_annees);
}

var ctx = document.getElementById('Graph_argent_place').getContext('2d');
var ctx2 = document.getElementById('Graph_dividendes').getContext('2d');
let initial = 10000;
let annee_initiale = 2022;
let rendement = 6;
let apport_mensuel = 500;
let nombre_annees = 20;

var argent_place = [];
var dividendes_mensuel = [];
var investisement = [];
var X = [];

function calcul(initial, annee_initiale, rendement, apport_mensuel, nombre_annees, argent_place, X, dividendes_mensuel, investisement)
{
  argent_place = [];
  dividendes_mensuel = [];
  investisement = [];
  X = [];
  argent_place.push(initial);
  investisement.push(initial);
  for (let i = 1; i < nombre_annees; i++) {
      argent_place.push(argent_place[i-1] + argent_place[i-1]*rendement + apport_mensuel*12);
      investisement.push(investisement[i-1] + apport_mensuel*12)
  }

  for (let i=0; i < nombre_annees; i++) {
      dividendes_mensuel.push(argent_place[i]*rendement / 12);
      X.push(i + annee_initiale);
  }

  return [X, argent_place, dividendes_mensuel, investisement];
}

[X, argent_place, dividendes_mensuel, investisement] = calcul(initial, annee_initiale, rendement/100, apport_mensuel, nombre_annees, argent_place, X, dividendes_mensuel, investisement);


const data_argent_place = {
  labels: X,
  datasets: [{ 
      data: argent_place,
      label: "Argent placé",
      borderColor: "rgb(62,149,205)",
      backgroundColor: "rgb(62,149,205,0.1)",
      fill: true,
      //steppedLine: 'before',
  }, {
      data: investisement,
      label: "Investissement",
      borderColor: "rgb(0,76,143)",
      backgroundColor: "rgb(0,76,143,0.2)",
      fill: true,
  }
  ],
}


var Graph_argent_place = new Chart(ctx, {
  type: 'line',
  data: data_argent_place,
  });

var Graph_dividendes = new Chart(ctx2, {
  type: 'line',
  data: {
      labels: X,
      datasets: [{ 
          data: dividendes_mensuel,
          label: "Dividendes mensuels",
          borderColor: "rgb(205,62,90)",
          backgroundColor: "rgb(205,62,90,0.1)",
          fill: true,
          //steppedLine: 'before',
      }
      ]
  },
  });



function calcul_salaire(chart2, nombre_annees){
  var salaire = 0;
  salaire = chart2.data.datasets[0].data[nombre_annees-1]
  return Math.round(salaire);
}

function calcul_argent_place(chart1, nombre_annees){
  var argent_place = 0;
  argent_place = chart1.data.datasets[0].data[nombre_annees-1]
  return Math.round(argent_place);
}

document.getElementById("salaire_id").innerHTML = calcul_salaire(Graph_dividendes, nombre_annees);
document.getElementById("argent_id").innerHTML = calcul_argent_place(Graph_argent_place, nombre_annees);