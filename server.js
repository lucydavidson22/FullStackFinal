let express = require('express');
let path = require('path');
let http = require('http');
var mongoose = require('mongoose');

let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let index = require('./server/routes/app');
const foodsRoutes = require('./server/routes/foods');
const sitInsRoutes = require('./server/routes/sitIns');
const homemadeRoutes = require('./server/routes/homemades');


let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(logger('dev'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use(express.static(path.join(__dirname, 'dist/food')));

app.use('/', index);
app.use('/foods', foodsRoutes);
app.use('/sitIns', sitInsRoutes);
app.use('/homemades', homemadeRoutes);

app.use((req, res, next) => {
  res.render('index')
});

mongoose.connect('mongodb+srv://Lucy:KSt89RF3WuxwjnXH@finalcluster.f8skm.mongodb.net/food?retryWrites=true&w=majority',
  { useNewUrlParser: true }, (err, res) => {
    if (err) {
      console.log('Connection failed: ' + err);
    }
    else {
      console.log('Connected to database!');
    }
  }
);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/food/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, function() {
  console.log('API running on localhost: ' + port)
});
