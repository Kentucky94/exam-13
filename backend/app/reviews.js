const express = require('express');

const Review = require('../models/Review');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const router =  express.Router();

router.post('/:recipeId', [auth], async (req, res) => {
  try{
    const reviewData = {
      user: req.user._id,
      recipe: req.params.recipeId,
      comment: req.body.comment,
      easyToCookRating: req.body.easyToCookRating,
      quickToCookRating: req.body.quickToCookRating,
      tasteRating: req.body.tasteRating,
    };

    const review = new Review(reviewData);

    await review.save();

    return res.send(review);
  }catch(error){
    return res.status(400).send(error);
  }
});

router.delete('/:reviewId', [auth, permit('admin')], async (req, res) => {
  try{
    await Review.deleteOne({_id: req.params.reviewId});

    return res.send({message: 'Successfully deleted!'});
  }catch(error){
    return res.status(400).send(error);
  }
});

module.exports = router;