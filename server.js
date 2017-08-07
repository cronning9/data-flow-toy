// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/dreams", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// ** MY APP STARTS HERE ** //
// inventory stored in memory
const inventory = [
  {
    name: 'Sears 3/4-inch Screws',
    size: '3/4 inch',
    price: .69,
    stock: 386
  },
  {
    name: 'Ready Maed Hammer Heads',
    size: '7 inch x 4 inch x 4',
    price: 24.99,
    stock: 12
  },
  {
    name: 'Energizer Screwdriver',
    size: '9 inch x 1.7 inch',
    price: 12.95,
    stock: 26
  }
];

app.get('/inventory', (req, res) => {
  res.send(inventory);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
