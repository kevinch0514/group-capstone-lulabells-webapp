let path = require('path');
let express = require('express');
let Router = require('express-promise-router');
let logger = require('morgan');
let app = express();

app.set('view engine', 'hbs');
// app.engine('hbs', handlebars({
//   layoutsDir: __dirname + '/views/layouts',
//   extname: 'hbs',
//   defaultLayout: 'index',
//   partialsDir: __dirname + '/views/partials/'
// }));

app.use(express.static('public'))

let router = Router();
app.use(router);

app.use(logger('dev'));



router.get('/', async(request, response) => {

  response.render("home");
});

router.get('/food', async(request, response) => {

  response.render("food");
});

router.get('/hygiene', async(request, response) => {

  response.render("hygiene");
});

router.get('/textbook', async(request, response) => {

  response.render("textbook");
});

router.get('/professionalclothing', async(request, response) => {

  response.render("professionalclothing");
});

router.get('/winterclothing', async(request, response) => {

  response.render("winterclothing");
});

router.get('/donations', async(request, response) => {

  response.render("donations");
});

router.get('/contact', async(request, response) => {

  response.render("contact");
});

router.get('/shopping', async(request, response) => {

  response.render("shopping");
});

router.get('/winterwear', async(request, response) => {

  response.render("winterwear");
});


// NEW SECTION FOR WINTER WEAR ROUTES (lines 75 to 113)
// let Router = require('express-promise-router');
// let db = require('../lib/database');
// let router = Router();

// http://localhost:3000/winterwear/172/edit
router.get('/winterwear/:winterwearId/edit', async(request, response) => {
  let winterwearId = request.winterwearId;
  let winterwear = await db('winterwear').where('id', winterwearId);

  response.render('winterwear-edit', { winterwear: winterwear });
});

router.post('/winterwear/:winterwearId', async(request, response) => {
  let userData = request.body;
  let winterwear = await db('winterwear').where('id', winterwearId);
  // change winterwear based on user-supplied data and save back to database
  // redirect somewhere after UPDATE
});

router.get('/winterwear/new', async(request, response) => {
  response.render('winterwear-new');
});

router.post('/winterwear', async(request, response) => {
  let userData = request.body;

  let winterwearData = {
    sku: userData.sku,
    name: userData.name,
    description: userData.description,
  };

  await db('winterwear').insert(winterwearData);

  response.redirect('/');
});

module.exports = router;

let SERVER_PORT = process.env.PORT || 3000;

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port ${SERVER_PORT}...`);
  console.log('Visit this URL in your browser to see the web app:');
  console.log();
  console.log(`    http://localhost:${SERVER_PORT}`);
  console.log();
});
