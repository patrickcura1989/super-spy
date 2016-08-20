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

// scrapes values from the countdown website
function getCountdownPrice(item) {
  url =
  'http://shop.countdown.co.nz/Shop/Search?__RequestVerificationToken=HAczcFWEE1H8iljsKxgyHq357IOAO41Kz%2BWZfmDBiYL%2FyVH9RVH2F3zYV%2FOj4TcZrTa9sd5j%2F2xPMJUGKzB%2F6JZZ2hOClR9a9Ya8d79RdTLrTeX%2FPbuMYSldIbSQjhK98dgZYhYCMwgnSu6S31yvARxHalCog2v%2Fo5DynH3MNr8%3D&search='
  +item+
  '&SearchType=grocery&_mode=ajax&_ajaxsource=search-panel&_referrer=%2FShop%2FSearchProducts%3Fsearch%3D'
  +item+
  '&_showTrolley=false&_bannerViews=2987,3478,3501,3503,3511&_=1471659959708';
return new Promise(function(resolve, reject){
    request(url, function(error, response, html){
      var ret = response.body+"";
      ret = ret.replace(/&gt;/g, '>');
      ret = ret.replace(/&lt;/g, '<');
      ret = ret.replace(/&quot;/g, '"');
      ret = ret.replace(/&apos;/g, "'");
      ret = ret.replace(/&amp;/g, '&');
        if(!error){
        var $ = cheerio.load(ret);
        var title, release, rating;
        var json = { price1 : "", price2 : ""};
        var count = 0;
        $('.price.din-medium').filter(function(){
          if(count == 0){
            var data = $(this);
            var price = data.first().text().replace("ea","").replace("kg","").replace(/ /g,'').replace(/(\r\n|\n|\r)/gm,"").trim().replace("$","").replace(".","");
            resolve(parseInt(price));
          }
          count++;
        })
      }
    });
  });
}

// Function scrapes off the pak n save website for information
function getPakNSavePrice(item){
   return Promise.resolve(inventory["pak_n_save"][item]);
}

// Function scrapes off the new world website for information
function getNewWorldPrice(item){
  return Promise.resolve(inventory["new_world"][item]);
}

// This function handles HTML GET requests
app.get('/', function(req, res) {
  res.sendfile("index.html");
});

app.get('/search', function(req, res){
     var item = req.param('item');
     console.log(item);
     Promise.all([getCountdownPrice(item),getNewWorldPrice(item),getPakNSavePrice(item)]).then (function(values){
       //values looks like [0,0, 0]
       var prices = [{"price":values[0]},{"price":values[1]},{"price":values[2]}]
       // Format dictionary
       var shop_to_price = {"countdown":prices[0], "new_world":prices[1], "pak_n_save": prices[2]};
       res.json(shop_to_price);
     });
})

app.listen(3000);

console.log("Serving files on localhost:3000");
console.log("example search: http://localhost:3000/search?item=eggs");

// this function returns a map containing spoof values
// function searchInventory(item) {
//   //search inventory
//   var countdown = Promise.resolve(inventory["countdown"][item]);
//   var new_world = Promise.resolve(inventory["new_world"][item]);
//   var pak_n_save = Promise.resolve(inventory["pak_n_save"][item]);
//
//   return Promise.all([countdown, new_world, pak_n_save]).t
// }
