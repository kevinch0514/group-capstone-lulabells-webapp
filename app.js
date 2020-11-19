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
app.use(express.urlencoded({ extended: true }));
let router = Router();
app.use(router);

app.use(logger('dev'));

let db = require('./database');

router.get('/', async(request, response) => {

  response.render("home");
});

router.get('/textbook', async(request, response) => {

  response.render("textbook");
});

router.get('/formalWear', async(request, response) => {

  response.render("formalWear");
});

// router.get('/winterwear', async(request, response) => {

//   response.render("winterwear");
// });

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
  let winterwear = await db('products').select('*').orderBy('name', 'ASC');
  let viewName = 'winterwear';
  let viewData = { winterwear: winterwear };
  console.log('winterwear is', winterwear);
  response.render(viewName, viewData);
});


// NEW SECTION FOR WINTER WEAR ROUTES (lines 75 to 113)
// let Router = require('express-promise-router');
// let db = require('../lib/database');
// let router = Router();

// http://localhost:3000/winterwear/172/edit
router.get('/winterwear/:winterwearId/edit', async(request, response) => {
  let winterwearId = request.params.winterwearId;
  let winterwear = await db('products').where('id', winterwearId).first();
  console.log('winterwearID is', winterwearId);
  console.log('winterwear is', winterwear);
  winterwear.admin = true;
  response.render('winterwear-edit', { winterwear: winterwear });
});

router.post('/winterwear/:winterwearId', async(request, response) => {
  let userData = request.body;
  let winterwearId = request.params.winterwearId;
  let winterwear = await db('products').where('id', winterwearId).first();
  // change winterwear based on user-supplied data and save back to database
  // redirect somewhere after UPDATE
  let winterwearData = {
    sku: userData.sku,
    name: userData.name,
    description: userData.description,
  };

  await db('products').where('id', winterwearId).update(winterwearData);
  response.redirect(`/winterwear/${winterwearId}/edit`);
});

router.get('/winterwear/new', async(request, response) => {
  response.render('winterwear-new');
});

router.post('/winterwear', async(request, response) => {
  let userData = request.body;
  console.log('user data is', userData)

  let winterwearData = {
    sku: userData.sku,
    name: userData.name,
    description: userData.description,
  };

  await db('products').insert(winterwearData);

  response.redirect('/winterwear');
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
