var express = require('express');
var request = require('request-promise-native');
var cheerio = require('cheerio');
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


function searchInventory(item) {
  //search inventory
  var countdown = inventory["countdown"][item];
  var new_world = inventory["new_world"][item];
  var pak_n_save = inventory["pak_n_save"][item];

  // return map of results
  return {"countdown": {"price": countdown}, "new_world": {"price": new_world}, "pak_n_save": {"price": pak_n_save}};
}

app.get("/scrape", (req, res)=> {
  //var item = req.param('item');
  //res.send(searchInventory(item));

})

app.listen(3000);

console.log("connect to port localhost:3000");
