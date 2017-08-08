// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const sassMW = require('express-sass-middleware');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// app.get('/style.css', sassMW({
//   file: './public/client/style.scss', 
//   watch: true,
//   precompile: true,
//   // any other properties added will be passed down to node-sass directly
//   // for example:
//   outputStyle: 'compressed',
//   // includePaths: ['./my', './directories'],
//   indentedSyntax: true
// }));

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

// listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
