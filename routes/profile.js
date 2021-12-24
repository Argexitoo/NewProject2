const express = require('express');
const Dog = require('../models/dog');

function profileRoutes() {
  const router = express.Router();

  router.get('/profile', async (req, res, next) => {
    try {
      res.render('./profile/profile');
    } catch (e) {
      next(e);
    }
  });

   router.get('/profile-newdog', async (req, res, next) => {
    try {
      res.render('./profile/profile-newdog');
    } catch (e) {
      next(e);
    }
  });


    router.post('/profile-newdog', async (req, res, next) => {
      const userId = req.session.currentUser._id;
        const { name, sex, race, size, age } = req.body;
            try {
            if (!name || !sex || !race || !size || !age ) {
                return res.render('./profile/profile-newdog', {
                errorMessage: 'Complete all fields',
                });
            }
        const dog = await  Dog.create({ name, sex, race, size, age, owner: userId });
        res.redirect('/profile');

    } catch (e) {
      next(e);
    }
  });


   router.get('/profile-mydog', async (req, res, next) => {
    const userId = req.session.currentUser._id;
    try {
      const foundDogs = await Dog.find({ owner: userId })
      res.render('./profile/profile-mydog', { foundDogs });
    } catch (e) {
      next(e);
    }
  });

  return router;
}

module.exports = profileRoutes;