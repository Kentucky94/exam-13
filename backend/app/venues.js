const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');

const config = require('../config');
const Venue = require('../models/Venue');
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
    const venues = await Venue.find();

    return res.send(venues);
  }catch(error){
    return res.status(500).send(error);
  }
});

router.get('/:venueId', async (req, res) => {
  try{
    const venue = await Venue.findById(req.params.venueId);

    return res.send(venue);
  }catch(error){
    return res.status(500).send(error);
  }
});

router.post('/', [auth, upload.single('mainImage')], async (req, res) => {
  try{
    const venueData = {
      title: req.body.title,
      user: req.user._id,
      description: req.body.description,
      mainImage: req.file.filename,
    };

    if(!req.body.isAgreed || !JSON.parse(req.body.isAgreed)) return res.status(400).send({error: 'You must agree to Terms and Conditions!'});

    const venue = new Venue(venueData);

    await venue.save();

    return res.send(venue);
  }catch(error){
    return res.status(500).send(error);
  }
});

router.post('/reRate/:venueId', [auth], async (req, res) => {
  try{
    const venue = await Venue.findById(req.params.venueId);
    const reviews = await Review.find({venue: req.params.venueId});

    if(!venue) return res.status(400).send({error: 'No venues found'});

    let foodAverage = venue.foodRating;
    let serviceAverage = venue.serviceRating;
    let interiorAverage = venue.interiorRating;

    if(reviews.length > 0){
      const foodSummary = reviews.reduce((acc, rew) => {
        return (acc + JSON.parse(rew.foodRating));
      }, 0);

      const serviceSummary = reviews.reduce((acc, rew) => {
        return (acc + JSON.parse(rew.serviceRating));
      }, 0);

      const interiorSummary = reviews.reduce((acc, rew) => {
        return (acc + JSON.parse(rew.interiorRating));
      }, 0);

      foodAverage = foodSummary / reviews.length;
      serviceAverage = serviceSummary / reviews.length;
      interiorAverage = interiorSummary / reviews.length;
    }else{
      foodAverage = 0;
      serviceAverage = 0;
      interiorAverage = 0;
    }

    venue.foodRating = foodAverage.toFixed(1);
    venue.serviceRating = serviceAverage.toFixed(1);
    venue.interiorRating = interiorAverage.toFixed(1);

    await venue.save();

    return res.send(venue);
  }catch(error){
    return res.status(500).send(error);
  }
});

router.delete('/:venueId', [auth, permit('admin')],async (req, res) => {
  try{
    const reviews = await Review.find({venue: req.params.venueId});

    for(let rew of reviews){
      await Review.deleteOne({_id: rew._id})
    }

    await Venue.deleteOne({_id: req.params.venueId});

    return res.send({message: 'Venue has been deleted!'});
  }catch(error){
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;