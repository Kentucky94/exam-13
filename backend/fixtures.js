const mongoose = require('mongoose');
const {nanoid} = require('nanoid');

const config = require('./config');
const User = require('./models/User');
const Recipe = require('./models/Recipe');

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for(let coll of collections){
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [user1, user2, user3] = await User.create({
    username: 'user1',
    password: 'password1',
    token: nanoid(),
    displayName: 'Albert Wesker',
    role: 'admin',
  }, {
    username: 'user2',
    password: 'password2',
    token: nanoid(),
    displayName: 'William Birkin',
  }, {
    username: 'user3',
    password: 'password3',
    token: nanoid(),
    displayName: 'Jill Valentine',
  });

  const [rec1, rec2, rec3] = await Recipe.create({
    title: 'The first recipe',
    user: user1,
    mainImage: '/recipe1.jpg',
    description: 'Recipe by user1',
  }, {
    title: 'The second recipe',
    user: user2,
    mainImage: '/recipe2.jpg',
    description: 'Recipe by user2',
    easyToCookRating: 4,
    quickToCookRating: 3,
    tasteRating: 4,
  }, {
    title: 'The third recipe',
    user: user3,
    mainImage: '/recipe3.jpg',
    description: 'Recipe by user3',
    easyToCookRating: 4,
    quickToCookRating: 3,
    tasteRating: 5,
  });

  mongoose.connection.close();
};

run().catch(error => {
  mongoose.connection.close();
  throw error;
});