const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const users = require('./app/users');
const recipes = require('./app/recipes');
const reviews = require('./app/reviews');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  app.use('/users', users);
  app.use('/recipes', recipes);
  app.use('/reviews', reviews);

  app.listen(config.port, () => {
    console.log(`Server started on ${config.port}`);
  });
};

run().catch(error => {
  console.error(error);
});