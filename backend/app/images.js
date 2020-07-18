const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');

const Image = require('../models/Image');
const config = require('../config');
const auth = require('../middleware/auth');

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

router.get('/:venueId', [auth], async (req, res) => {
  try{
    const images = await Image.find({venue: req.params.venueId});

    return res.send(images);
  }catch(error){
    return res.status(400).send(error);
  }
});

router.post('/:venueId', [auth, upload.single('image')], async (req, res) => {
  try{
    const imageData = {
      user: req.user._id,
      venue: req.params.venueId,
      image: req.file.filename,
    };

    const image = new Image(imageData);

    await image.save();

    return res.send(image);
  }catch(error){
    return res.status(400).send(error);
  }
});

module.exports = router;