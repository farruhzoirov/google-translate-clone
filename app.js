const path = require("path");

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const convertRouter = require('./routes/convert.route.js');
const getPageRouter = require('./routes/get-page.route.js');

const app = express();


app.use(cors());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.json());

app.use(convertRouter);
app.use(getPageRouter);

app.listen(5000, function() {
  console.log("Server running on port 5000...");
});
