var express = require('express');
var app = express();

// enable CORS
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/timestamp/:date?', (req, res) => {
  let input = req.params.date;
  // if input is null, use current date
  if (input == null) {
    let date = new Date();
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
    return;
  }
  // if input is timestamp, convert type to Integer
  if (/^\d{5,}$/.test(input)) input = parseInt(input, 10);
  
  const date = new Date(input);
  if (!/Invalid Date/i.test(date.toUTCString())) {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  } else {
    res.json({ error: 'Invalid Date' });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});