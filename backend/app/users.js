const express = require('express');

const User = require('../models/User');

const router = express.Router();

router.get('/:id', async (req, res) => {
  try{
    const user = await User.findOne({_id: req.params.id});
    user.token = '';
    return res.send(user);
  }catch(error){
    return res.status(400).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const userData = {
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
    };

    const user = new User(userData);

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post('/sessions', async (req, res) => {
  try{
    const user = await User.findOne({username: req.body.username});
    if (!user) return res.status(400).send({error: 'Username or password not correct!'});

    const isMatch = await user.comparePasswords(req.body.password);
    if (!isMatch) return res.status(400).send({error: 'Username or password not correct!'});

    user.generateToken();
    await user.save();

    return res.send(user);
  }catch(error){
    return res.status(400).send(error);
  }
});

router.delete('/sessions', async (req, res) => {
  const success = {message: 'Success'};

  try{
    const token = req.get('Authorization').split(' ')[1];
    if(!token) return res.send(success);

    const user = await User.findOne({token});
    if(!user) return res.send(success);

    user.generateToken();
    await user.save();

    return res.send(success);
  }catch(e){
    return res.send(success);
  }
});

module.exports = router;