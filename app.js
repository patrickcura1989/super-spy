var express = require('express');
var request = require('request-promise-native');
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

var forecastIOKey = "XXX"; // FIXME : replace with your API key gained from forecast.io
var inventory = {"countdown": {"eggs" : 725,
                               "milk" : 643,
                               "ham" :  300,
                               "bread": 100,
                               "sugar": 500,
                               "chocolate": 200,
                               "mince": 1400,
                               "coffee": 500,
                               "hotdog": 200,
                               "orange_juice": 400},

                 "pak_n_save": {"eggs" : 500,
                               "milk" : 543,
                               "ham" :  200,
                               "bread": 50,
                               "sugar": 400,
                               "chocolate": 100,
                               "mince": 1300,
                               "coffee": 400,
                               "hotdog": 100,
                               "orange_juice": 300},
                  "new_world": {"eggs" : 825,
                               "milk" : 743,
                               "ham" :  350,
                               "bread": 150,
                               "sugar": 550,
                               "chocolate": 250,
                               "mince": 1450,
                               "coffee": 550,
                               "hotdog": 250,
                               "orange_juice": 450}
                };


function searchInvetory(item) {
  //search inventory

  // return map of results
}


//function requestTemperature() {
//  var url = "https://api.forecast.io/forecast/" + forecastIOKey + "/-41.2865,174.7762";

//  return request({url: url, json: true}).then(data => {
//    var temperature = data.currently.temperature;
//    var celsius = (temperature - 32) * 5 / 9;

//    return Math.round(celsius * 10) / 10;
//  });
//};

//function determineFood(temperature) {
//  if (temperature > 21) {
//    return "ice cream";
//  }
//  else {
//    return "fried noodles";
//  }
//}

//app.get("/", (req, res) => {
//  requestTemperature().then(temperature => {
//    var food = determineFood(temperature);
//    var variables = {temperature, food};
//    res.render("index.html.ejs", variables);
//  });
//});

//app.listen(3000);
