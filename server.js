var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.set('view engine', 'pug')



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

      var position, team, points;
      var json = [];

      // We'll use the unique element tbody as a starting point
      for(var i = 2; i < 22; i++) {
        $('tbody tr:nth-child('+i+')').filter(function(){
          var data = $(this);

          position = data.children().first().text();

          team = data.children().first().next().children().text();

          points = data.children().last().text();

          json.push({team: team, points: points});

          /*
          json[i].position.push(position);
          json[i].team.push(team);
          json[i].points.push(points);
          */
        })
      }
      res.render('index', { json: json})
    }
    
    var JSONstring = JSON.stringify(json, null, 4);

    fs.writeFile('output.json', JSONstring, function(err){
      console.log('File successfully written');
    })
    
    /*
    fs.readFile('output.json', 'utf8', function(err, data) {
      var jsondata = JSON.parse(data);
      // res.writeHead(200, {'Content-Type': 'text/plain'});
      for(var j = 0; j < jsondata.length; j++) {
        var myTable = (j+1)+'     '+jsondata[j].team+'     '+jsondata[j].points+'\n';
        $('table').append(myTable);
      }
      res.render('index', { position: (j+1), team: json[j].team, points: json[j].points})
    })      
    */
    
  })
})


app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;


