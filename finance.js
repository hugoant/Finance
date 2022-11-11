function change(chart1, chart2){
  var apport = parseInt(document.getElementById('apport_init_id').value);
  var rendement = parseFloat(document.getElementById('rendement_id').value)/100;
  var apport_mensuel = parseFloat(document.getElementById('apport_mensuel_id').value);
  var annee_init = parseInt(document.getElementById('annee_init_id').value);
  var nombre_annees = parseInt(document.getElementById('nombre_annees_id').value);
  [chart1.data.labels, chart1.data.datasets[0].data, chart2.data.datasets[0].data] = calcul(apport, annee_init, rendement, apport_mensuel, nombre_annees, chart1.data.datasets.data, chart1.data.labels, chart2.data.datasets.data);
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
var X = [];

function calcul(initial, annee_initiale, rendement, apport_mensuel, nombre_annees, argent_place, X, dividendes_mensuel)
{
  argent_place = [];
  dividendes_mensuel = [];
  X = [];
  argent_place.push(initial);
  for (let i = 1; i < nombre_annees; i++) {
      argent_place.push(argent_place[i-1] + argent_place[i-1]*rendement + apport_mensuel*12);
  }

  for (let i=0; i < nombre_annees; i++) {
      dividendes_mensuel.push(argent_place[i]*rendement / 12);
      X.push(i + annee_initiale);
  }

  return [X, argent_place, dividendes_mensuel];
}

[X, argent_place, dividendes_mensuel] = calcul(initial, annee_initiale, rendement/100, apport_mensuel, nombre_annees, argent_place, X, dividendes_mensuel);


const data_argent_place = {
  labels: X,
  datasets: [{ 
      data: argent_place,
      label: "Argent placé",
      borderColor: "rgb(62,149,205)",
      backgroundColor: "rgb(62,149,205,0.1)",
      fill: true,
      //steppedLine: 'before',
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


// TEST API

fetch('https://gomakethings.com/about/').then(function (response) {
	// The API call was successful!
	return response.text();
}).then(function (html) {

	// Convert the HTML string into a document object
	var parser = new DOMParser();
	var doc = parser.parseFromString(html, 'text/html');

	// Get the image file
	var img = doc.querySelector('img');
	console.log(img);

}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});