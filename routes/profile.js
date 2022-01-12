const express = require('express');
const Dog = require('../models/dog');
const User = require('../models/user');
const Meeting = require('../models/meeting');
const isLoggedIn = require('../middlewares');

function profileRoutes() {
  const router = express.Router();

  router.get('/profile', isLoggedIn, async (req, res, next) => {
    const user = req.session.currentUser;
    try {
      const foundDogs = await Dog.find({ owner: user._id });
      res.render('./profile/profile', { user, foundDogs });
    } catch (e) {
      next(e);
    }
  });

  router.get('/profile/edit', isLoggedIn, async (req, res, next) => {
    const user = req.session.currentUser._id;
    try {
      const editUser = await User.findById(user);
      res.render('./profile/update-form-user', { user, editUser });
    } catch (e) {
      next(e);
    }
  });

  router.post('/profile/edit', isLoggedIn, async (req, res, next) => {
    const userId = req.session.currentUser._id;
    const { email, nickname, name, location, age } = req.body;
    try {
      const editedUser = await User.findByIdAndUpdate(userId, { email, nickname, name, location, age }, { new: true });
      req.session.currentUser = editedUser;
      return res.redirect('/profile');
    } catch (e) {
      next(e);
    }
  });

  return router;
}

module.exports = profileRoutes;
