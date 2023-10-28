const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const http = require('http').createServer(app);
const path = require('path');

// Set EJS as the template engine
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use('/', require('./routes/shopperRoutes'));

app.use('/', require('./routes/inventoryRoutes'));



app.listen(80, () => {
  console.log('listenting on port 80')
})

