//Install express server
const express = require('express');
const path = require('path');

const app = express();
// Serve only the static files form the dist directory
console.log("1");
app.use(express.static(__dirname + '/dist/dream4trip'));
console.log("2");
app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname+'/dist/dream4trip/index.html')),
);
console.log("3");
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
