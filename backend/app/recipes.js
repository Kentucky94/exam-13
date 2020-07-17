const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');

const config = require('../config');
const Recipe = require('../models/Recipe');
const Review = require('../models/Review');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const router = express.Router();

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname))
  },
  destination: (req, file, cb) => {
    cb(null, config.uploadPath)
  }
});

const upload = multer({storage});

router.get('/', async (req, res) => {
  try{
    const recipes = await Recipe.find();

    return res.send(recipes);
  }catch(error){
    return res.status(500).send(error);
  }
});

router.get('/:recipeId', async (req, res) => {
  try{
    const recipe = await Recipe.findById(req.params.recipeId);

    return res.send(recipe);
  }catch(error){
    return res.status(500).send(error);
  }
});

router.post('/', [auth, upload.single('mainImage')], async (req, res) => {
  try{
    const recipeData = {
      title: req.body.title,
      user: req.user._id,
      description: req.body.description,
    };

    if(req.file){
      recipeData.mainImage = req.file.filename;
    }

    const recipe = new Recipe(recipeData);

    await recipe.save();

    return res.send(recipe);
  }catch(error){
    return res.status(500).send(error);
  }
});

router.post('/addImg/:recipeId', [auth, upload.single('images')], async (req, res) => {
  try{
    const recipe = await Recipe.findById(req.params.recipeId);

    if(req.file){
      recipe.images.push(req.file.filename);
    }else{
      return res.status(400).send({error: 'No image'})
    }

    await recipe.save();

    return res.send(recipe);
  }catch(error){
    return res.status(500).send(error);
  }
});

router.post('/reRate/:recipeId', [auth], async (req, res) => {
  try{
    const recipe = await Recipe.findById(req.params.recipeId);

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
    return res.status(500).send(error);
  }
});

router.delete('/:recipeId', [auth, permit('admin')],async (req, res) => {
  try{
    await Recipe.deleteOne({_id: req.params.recipeId});

    return res.send({message: 'Successfully deleted!'});
  }catch(error){
    return res.status(500).send(error);
  }
});

module.exports = router;