const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const path = require('path');
const port = process.env.PORT || 8000;

const logger = require('./server/middleware/logger');

// console.log('logger', logger);
const app = express();
const names = [
  'Blob',
  'Sally',
  'George'
];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// app.use(function (request, response, next) {
//   console.log('before', request.body.something);

//   next();
// });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);
app.use(morgan('dev'));

app.use(function (request, response, next) {
  console.log('after', request.body);

  // get user information
  // check credentials


   // read about async/await
  next();
});

function stateful(doStuff, ...options) {
  return function (request, response, next) {
    console.log('inside stateful middleware', doStuff, options);
    console.log(request.doStuff);
    if (doStuff) {
      request.dostuff = true;
    } else {
      return next(new Error('do stuff was false'));
    }

    next();
  };
}

app.use(stateful(true, false, 'whatever'));


app.get('/', function (request, response) {
  // console.log(request.user);
  response.render('index');
});

app.post('/names', function (request, response) {
  console.log('posting data', request.body);

  names.push(request.body.name);

  response.render('results', { name: request.body.name, names });
  // response.redirect('/');
});

app.get('/names/:index', function (request, response) {
  console.log(request.params);
  response.send(names[request.params.index]);
});

console.log('length', app.use.length);


app.use(function (error, request, response, next) {
  console.log(error.message);
  // log error to db
  next(error);
});

app.use(function (error, request, response, next) {
  // respond

  response.send(error.message);
});

// app.get('/names/1', function (request, response) {
//   response.send(names[1]);
// });

app.listen(port, () => console.log(`Express server listening on port ${port}`));
// app.listen(port, function () { console.log(`Express server listening on port ${port}`) });

