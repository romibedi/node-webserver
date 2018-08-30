const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  fs.appendFile('server.log', log + '\n', (err) => {
      if (err) { console.log('Unable to log messages to server log')}
  });

  next();
});

// uncomment to bring the site to maintenance mode
//app.use((req, res, next) => {
//  res.render('maintenance.hbs');
//});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase(text);
});



app.get('/', (req, res) => {
  res.render( 'home.hbs',
    {
      name: 'Raminder',
      likes:['sports', 'reading', 'music'],
      pageTitle: 'Home Page',
    });
});

app.get('/about', (req, res) => {
  res.render(
    'about.hbs', {pageTitle: 'About Page'}
    );
});

app.get('/bad', (req, res) => {
  res.send('Unable to handle request');
});

app.listen(3000);
