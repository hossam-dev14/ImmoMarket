const express = require("express");
const dotenv = require("dotenv");

// Charger les données et démarrer le serveur
const data = require('./data.js')

dotenv.config();
const port = process.env.PORT || 8080;
const app = express();


// parse incoming requests data
app.use(express.json());

// -------------- Test ------------------- //
app.get('/test', (req, res) => {
  res.send({data: 'hello from server!!!'});
});

// ------ Define routes for products
app.get('/api/test', (req, res) => {
    res.send(data);
    // console.log(data);
});

app.listen(port, function(err){
  console.log("Server is Run on", port);
})

