let path = require('path');
let express = require('express');
let Router = require('express-promise-router');
let handlebars = require('express-handlebars');
let logger = require('morgan');
let app = express();

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs',
  defaultLayout: 'index',
  partialsDir: __dirname + '/views/partials/'
}));

app.use(express.static('public'))

let router = Router();
app.use(router);

app.use(logger('dev'));



router.get('/', async(request, response) => {

  response.render("home", {layout: "index"});
});

router.get('/food', async(request, response) => {

  response.render("food", {layout: "index"});
});

router.get('/hygiene', async(request, response) => {

  response.render("hygiene", {layout: "index"});
});

router.get('/textbook', async(request, response) => {

  response.render("textbook", {layout: "index"});
});

router.get('/professionalclothing', async(request, response) => {

  response.render("professionalclothing", {layout: "index"});
});

router.get('/winterclothing', async(request, response) => {

  response.render("winterclothing", {layout: "index"});
});

router.get('/donations', async(request, response) => {

  response.render("donations", {layout: "index"});
});

router.get('/contact', async(request, response) => {

  response.render("contact", {layout: "index"});
});

router.get('/shopping', async(request, response) => {

  response.render("shopping", {layout: "index"});
});

let SERVER_PORT = process.env.PORT || 3000;

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port ${SERVER_PORT}...`);
  console.log('Visit this URL in your browser to see the web app:');
  console.log();
  console.log(`    http://localhost:${SERVER_PORT}`);
  console.log();
});
