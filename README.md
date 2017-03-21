# ESPN FC Premier League Table Scraper

### Using Node, Express, Request, & Cheerio libraries with the Pug framework

While running, directs requests to localhost:8081/scrape to the ESPN FC Premier League Table in order to return a JSON object including three arrays:

obj.position - Team position in the table

obj.team - Team Name

obj.points - Total points to date

Uses the JSON object to populate a Pug view showing the current table in text format.


### Array indexing
Due to array indexing, the team in 1st position is found at the index of 0.

For Example: 

obj.position[0] = Position 1

To fill a full row of the table, use the same array position for each property call to obj.  The name of the first place team will be stored in array index [0].

For Example: 

Row 1: obj.position[0], obj.team[0], obj.points[0]

Row 2: obj.position[1], obj.team[1], obj.points[1]

Row 3: obj.position[2], obj.team[2], obj.points[2]

.

.

.

Row 20: obj.position[19], obj.team[19], obj.points[19]
