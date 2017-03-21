var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape/', function(req, res) {
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

      var position, team, points, table;
      var json = { position : [], team : [], points : []};

      // We'll use the unique element tbody as a starting point
      for(var i = 2; i < 22; i++) {
        $('tbody tr:nth-child('+i+')').filter(function(){
          var data = $(this);

          console.log(data);

          position = data.children().first().text();

          team = data.children().first().next().children().text();

          points = data.children().last().text();

          json.position.push(position);
          json.team.push(team);
          json.points.push(points);

        })
      }
    }
    
    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written');
    })

    res.send('Check your console!');
  })
})


app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;


