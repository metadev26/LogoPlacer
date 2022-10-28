const express = require('express');
const path = require('path');
var cors = require('cors')

const app = express();
const port = process.env.PORT || 54300;

app.use(cors());
app.use('/', express.static(__dirname + '/src'));

// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/src/index.html'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);