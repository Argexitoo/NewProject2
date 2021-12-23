const express = require('express');
const User = require('../models/user');

function profileRoutes() {
  const router = express.Router();

  router.get('/profile', async (req, res, next) => {
    try {
      res.render('profile');
    } catch (e) {
      next(e);
    }
  });

   router.get('/profile-newdog', async (req, res, next) => {
    try {
      res.render('profile-newdog');
    } catch (e) {
      next(e);
    }
  });


  return router;
}

module.exports = profileRoutes;