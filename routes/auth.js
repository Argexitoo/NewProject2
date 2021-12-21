const bcrypt = require('bcryptjs');
const express = require('express');

function authRoutes(){
      const router = express.Router();

    router.get('/sign-up', async (req, res, next) => {
    try {
      res.render('./auth/sign-up');
    } catch (e) {
      next(e);
    }
  });

    router.post('/sign-up', async (req, res, next) => {
        const { email, password } = req.body;
            try {
            res.render('./auth/sign-up');
            } catch (e) {
            next(e);
            }
  });


    router.get('/log-in', async (req, res, next) => {
    try {
      res.render('./auth/log-in');
    } catch (e) {
      next(e);
    }
  });







    return router;
}

module.exports = authRoutes;
