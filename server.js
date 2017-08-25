var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.set('view engine', 'pug')

app.get('/', function(req, res) {
  // The url we will scrape from - in this example, ESPNFC

  url = 'http://www.espnfc.us/english-premier-league/23/table';

  // The structure of our request call
  // The first parameter is our URL
  // The callback function takes 3 parameters, an error, response status code, and the html

  request(url, function(error, response, html){
    
    // First we'll check to make sure no errors occurred when making the request

    if(!error){
      // Next, we utilize the cheerio library on the returned html which will essentially give us jQuery functionality

      var $ = cheerio.load(html);

      // Finally, we'll define the variables we're going to capture

      var team, points, mainColor, secondColor;
      var json = [];

      // We'll use the unique element tbody as a starting point
      for(var i = 2; i < 22; i++) {
        $('tbody tr:nth-child('+i+')').filter(function(){
          var data = $(this);

          team = data.children().first().next().children().text();

          points = data.children().last().text();

          // Set Team Colors
          switch (team) {
            case "Manchester United":
              mainColor = 'red';
              secondColor = 'white';
              break;
            case "Huddersfield Town":
              mainColor = 'blue';
              secondColor = 'white';
              break;
            case "West Bromwich Albion":
              mainColor = 'navy';
              secondColor = 'white';
              break;
            case "Watford":
              mainColor = 'yellow';
              secondColor = 'black';
              break;
            case "Manchester City":
              mainColor = 'skyblue';
              secondColor = 'white';
              break;
            case "Liverpool":
              mainColor = 'red';
              break;
            case "Southampton":
              mainColor = 'red';
              secondColor = 'white';
              break;
            case "Everton":
              mainColor = 'royalblue';
              secondColor = 'white';
              break;
            case "Leicester City":
              mainColor = 'royalblue';
              secondColor = 'white';
              break;
            case "Tottenham Hotspur":
              mainColor = 'royalblue';
              secondColor = 'white';
              break;
            case "Arsenal":
              mainColor = 'red';
              secondColor = 'white';
              break;
            case "Chelsea":
              mainColor = 'blue';
              secondColor = 'royalblue';
              break;
            case "Burnley":
              mainColor = 'darkred';
              secondColor = 'skyblue';
              break;
            case "Stoke City":
              mainColor = 'red';
              secondColor = 'white';
              break;
            case "Swansea City":
              mainColor = 'white';
              secondColor = 'black';
              break;
            case "AFC Bournemouth":
              mainColor = 'red';
              secondColor = 'black';
              break;
            case "Newcastle United":
              mainColor = 'white';
              secondColor = 'black';
              break;
            case "Brighton & Hove Albion":
              mainColor = 'blue';
              secondColor = 'white';
              break;
            case "Crystal Palace":
              mainColor = 'blue';
              secondColor = 'red';
              break;
            case "West Ham United":
              mainColor = 'darkred';
              secondColor = 'skyblue';
              break;
            default:
              mainColor = 'white';
          }

          json.push({team: team, points: points, backgroundColor: mainColor, textColor: secondColor});

        })
      }
      res.render('index', { json: json})
    }
    
    var JSONstring = JSON.stringify(json, null, 4);

    fs.writeFile('output.json', JSONstring, function(err){
      console.log('File successfully written');
    })   
  })
})

app.listen('8081');

console.log('Magic happens on port 8081');

exports = module.exports = app;


