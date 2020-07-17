const express = require('express');

const Recipe = require('../models/Recipe');
const Review = require('../models/Review');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const router = express.Router();

router.post('/reRate/:recipeId', [auth, permit('user', 'admin')], async (req, res) => {
  try{
    const recipe = Recipe.findById(req.params.recipeId);

    const reviews = await Review.find({recipe: req.params.recipeId});

    if(!recipe) return res.status(400).send({error: 'No recipe found'});
    if(!reviews) return res.status(400).send({error: 'No reviews found'});

    let easyToCookAverage = recipe.easyToCookRating;
    let quickToCookAverage = recipe.quickToCookRating;
    let tasteAverage = recipe.tasteRating;

    if(reviews.length > 0){
      easyToCookAverage = reviews.reduce((acc, rew) => {
        return (acc + rew.easyToCookRating) / reviews.length;
      });

      quickToCookAverage = reviews.reduce((acc, rew) => {
        return (acc + rew.quickToCookRating) / reviews.length;
      });

      tasteAverage = reviews.reduce((acc, rew) => {
        return (acc + rew.tasteRating) / reviews.length;
      });
    }else{
      return res.status(400).send({error: 'No reviews found'})
    }

    recipe.easyToCookRating = easyToCookAverage.toFixed(1);
    recipe.quickToCookRating = quickToCookAverage.toFixed(1);
    recipe.tasteRating = tasteAverage.toFixed(1);

    await recipe.save();

    return res.send(recipe);
  }catch(error){
    return res.status(500).send({error: 'Something went wrong'})
  }
});

module.exports = router;