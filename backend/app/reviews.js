const express = require('express');

const Review = require('../models/Review');
const Venue = require('../models/Venue');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const router =  express.Router();

router.post('/:venueId', [auth], async (req, res) => {
  try{
    const reviewData = {
      user: req.user._id,
      venue: req.params.venueId,
      comment: req.body.comment,
      foodRating: req.body.foodRating,
      serviceRating: req.body.serviceRating,
      interiorRating: req.body.interiorRating,
    };

    // validation check

    const venue = await Venue.findById(req.params.venueId);

    if(String(req.user._id) === String(venue.user)){
      return res.status(400).send({error: 'You cannot rate your own venue'});
    }

    // after validation

    const review = new Review(reviewData);

    await review.save();

    return res.send(review);
  }catch(error){
    console.log(error);
    return res.status(400).send(error);
  }
});

router.delete('/:reviewId', [auth, permit('admin')], async (req, res) => {
  try{
    await Review.deleteOne({_id: req.params.reviewId});

    return res.send({message: 'Review has been deleted!'});
  }catch(error){
    return res.status(400).send(error);
  }
});

module.exports = router;