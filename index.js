let express = require('express');
let app = express();
let ejs = require('ejs');
const haikus = require('./haikus.json');
const port = process.env.PORT || 3000;

app.use(express.static('public'))
app.set('view engine', 'ejs');

const renderHaikus = (res, selectedHaikus) => {
  res.render('index', { haikus: selectedHaikus });
};

const getRandomHaiku = () => {
  return haikus[Math.floor(Math.random() * haikus.length)];
};

app.get('/', (req, res) => {
  renderHaikus(res, haikus);
});

//get a random haiku by GET request
app.get('/random', (req, res) => {
  const randomHaiku = getRandomHaiku();
  renderHaikus(res, [randomHaiku]);
});

//get haiku by id
app.get('/:id', (req, res) => {
  const haiku = haikus[req.params.id];
  if (haiku) {
    renderHaikus(res, [haiku]);
  } else {
    res.status(404).send('Haiku not found');
  }
});

//get a random haiku by POST request
app.post('/random', (req, res) => {
  const randomHaiku = getRandomHaiku();
  renderHaikus(res, [randomHaiku]);
});

// Export the app
module.exports = app;

// Start the server only if this file is run directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}