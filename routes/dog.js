const express = require('express');
const Dog = require('../models/dog');
const User = require('../models/user');
const Meeting = require('../models/meeting');
const isLoggedIn = require('../middlewares');

function dogRoutes() {
  const router = express.Router();

  router.get('/mydogs', async (req, res, next) => {
    const userId = req.session.currentUser._id;
    try {
      const foundDogs = await Dog.find({ owner: userId });
      res.render('./dog/mydogs', { foundDogs });
    } catch (e) {
      next(e);
    }
  });

  router.get('/profile-newdog', async (req, res, next) => {
    try {
      res.render('./dog/profile-newdog');
    } catch (e) {
      next(e);
    }
  });

  router.post('/profile-newdog', async (req, res, next) => {
    const userId = req.session.currentUser._id;
    const { name, sex, race, size, age } = req.body;
    try {
      if (!name || !sex || !race || !size || !age) {
        return res.render('./dog/profile-newdog', {
          errorMessage: 'Complete all fields',
        });
      }
      const dog = await Dog.create({ name, sex, race, size, age, owner: userId });
      res.redirect('/mydogs');
    } catch (e) {
      next(e);
    }
  });

  router.get('/profile-mydog/:id/edit', async (req, res, next) => {
    const { id } = req.params;
    try {
      const editDog = await Dog.findById(id);
      res.render('./dog/update-form', { id, editDog });
    } catch (e) {
      next(e);
    }
  });

  router.post('/profile-mydog/:id/edit', async (req, res, next) => {
    const { id } = req.params;
    const { name, sex, race, size, age } = req.body;
    try {
      const editDog = await Dog.findByIdAndUpdate(id, { name, sex, race, size, age }, { new: true });
      return res.redirect('/mydogs');
    } catch (e) {
      next(e);
    }
  });

  router.get('/profile-mydog/:id/delete', async (req, res, next) => {
    const { id } = req.params;
    try {
      const deleteDog = await Dog.findByIdAndDelete(id);
      res.redirect('/mydogs');
    } catch (e) {
      next(e);
    }
  });

  return router;
}

module.exports = dogRoutes;
