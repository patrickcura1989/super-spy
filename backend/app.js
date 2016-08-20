var express = require('express');
var fs = require('fs');
var request = require('request');
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

app.get('/', function(req, res){

var item = req.param('item');
console.log(item);
res.json(searchInventory(item));

url = 'https://shop.newworld.co.nz/store/6EE070045#/search/egg/1';

request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

    var title, release, rating;
    var json = { price1 : "", price2 : ""};

    console.log($('html').html());

    var stream = fs.createWriteStream("my_file.txt");
stream.once('open', function(fd) {
  stream.write($('html').html()+"");
  stream.end();
});

    $('.price.din-medium').filter(function(){
        var data = $(this);
        console.log(data.text());

        json.price1 = data.text();
    })


}

// To write to the system we will use the built in 'fs' library.
// In this example we will pass 3 parameters to the writeFile function
// Parameter 1 :  output.json - this is what the created filename will be called
// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
// Parameter 3 :  callback function - a callback function to let us know the status of our function

fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})

// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.


    }) ;
})

app.listen(3000);

console.log("connect to port localhost:3000");
