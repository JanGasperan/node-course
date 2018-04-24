const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000; // heroku and local

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err){
      console.log('Unable to append to server.log');
    }
  });

  next();
});

app.use((req, res, next) => {
  res.render("maintnance.hbs", {
    pageTitle: 'Maintnance Page'
  });
});

app.use(express.static(__dirname + "/public")); // use is executed in order. If this use would be first the other app.use would not be called

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: 'Home Page',
    welcomeMessage: "Welcome to the HOME PAGE"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: 'About Page'
  });
});

app.get("/bad", (req, res) => {
  res.send({
      errorMessage: "Some error message!"
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
