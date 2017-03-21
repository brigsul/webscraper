# ESPN FC Premier League Table Scraper

### Using Node, Express, Request, & Cheerio libraries with the Pug framework

While running, directs requests to localhost:8081/scrape to the ESPN FC Premier League Table in order to return a JSON array including objects for each position in the table.

json.team: Team name in string format
json.points: Team point total in string format

Uses the JSON objects to populate a Pug view showing the current table in text format.


### Array indexing
Due to array indexing, the team in 1st position is found at the index of 0.

For Example: 

json[0] = Position 1

