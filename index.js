const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", (req, res) => {
  let dateString = req.params.date;
  let date;

  // Check if date string is a number (Unix timestamp)
  if (!isNaN(dateString)) {
    // Parse the date string as an integer and create a new date object
    date = new Date(parseInt(dateString));
  } else {
    // Parse the date string using the Date constructor
    date = new Date(dateString);
  }

  // Check if the date object is valid
  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
