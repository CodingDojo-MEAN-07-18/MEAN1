const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const port = process.env.PORT || 8000;
const app = express();
const names = [
  'Blob',
  'Sally',
  'George'
];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (request, response) {
  response.render('index');
});

app.post('/names', function (request, response) {
  console.log('posting data', request.body);

  names.push(request.body.name);

  // response.render('results', { name: request.body.name, names });
  response.redirect('/');
});

app.get('/names/:index', function (request, response) {
  console.log(request.params);
  response.send(names[request.params.index]);
});

// app.get('/names/1', function (request, response) {
//   response.send(names[1]);
// });

app.listen(port, () => console.log(`Express server listening on port ${port}`));
// app.listen(port, function () { console.log(`Express server listening on port ${port}`) });

