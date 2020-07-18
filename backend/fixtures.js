const mongoose = require('mongoose');
const {nanoid} = require('nanoid');

const config = require('./config');
const User = require('./models/User');
const Venue = require('./models/Venue');
const Review = require('./models/Review');

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

  const [ven1, ven2, ven3] = await Venue.create({
    title: 'The first venue',
    user: user1,
    mainImage: '/venue1.jpg',
    description: 'Venue owned by user1',
  }, {
    title: 'The second venue',
    user: user2,
    mainImage: '/venue2.jpg',
    description: 'Venue owned by user2',
  }, {
    title: 'The third venue',
    user: user3,
    mainImage: '/venue3.jpg',
    description: 'Venue owned by user3',
  });

  const [rew1, rew2, rew3] = await Review.create({
    user: user1,
    venue: ven2,
    comment: 'Good',
    foodRating: 4,
    serviceRating: 3,
    interiorRating: 5,
  }, {
    user: user2,
    venue: ven3,
    comment: 'Average',
    foodRating: 3,
    serviceRating: 3,
    interiorRating: 4,
  }, {
    user: user3,
    venue: ven1,
    comment: 'Bad',
    foodRating: 3,
    serviceRating: 3,
    interiorRating: 2,
  });

  mongoose.connection.close();
};

run().catch(error => {
  mongoose.connection.close();
  throw error;
});