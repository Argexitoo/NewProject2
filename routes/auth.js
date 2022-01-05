const bcryptjs = require('bcryptjs');
const express = require('express');
const User = require('../models/user');

function authRoutes() {
  const router = express.Router();

  router.get('/sign-up', async (req, res, next) => {
    try {
      res.render('./auth/sign-up');
    } catch (e) {
      next(e);
    }
  });

  router.post('/sign-up', async (req, res, next) => {
    const { email, password, location, age, nickname, name } = req.body;
    try {
      if (!email || !password || !location || !age || !nickname || !name) {
        return res.render('./auth/sign-up', {
          errorMessage: 'Complete all fields',
        });
      }
      const validPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
      if (!validPassword.test(password)) {
        return res.render('auth/sign-up', {
          errorMessage:
            'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.',
        });
      }

      const userRepeat = await User.findOne({ email: email });
      if (userRepeat) {
        return res.render('auth/sign-up', { errorMessage: 'User already taken' });
      }
      const saltRounds = 10;
      const salt = bcryptjs.genSaltSync(saltRounds);
      const newPassword = bcryptjs.hashSync(password, salt);

      const user = await User.create({ email, password: newPassword, location, age, nickname, name });
      res.redirect('/');
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

  router.post('/log-in', async (req, res, next) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.render('./auth/log-in', {
          errorMessage: 'Complete all fields',
        });
      }
      const dbUser = await User.findOne({ email });
      if (!dbUser) {
        return res.render('auth/log-in', { errorMessage: 'Email not found' });
      }
      const passwordUser = await bcryptjs.compare(password, dbUser.password);
      if (passwordUser) {
        req.session.currentUser = dbUser;
        return res.redirect('/profile');
      } else {
        return res.render('./auth/log-in', { errorMessage: 'Invalid Password' });
      }
    } catch (e) {
      next(e);
    }
  });
  router.get('/log-out', async (req, res, next) => {
    if (req.session) {
      req.session.auth = null;
      res.clearCookie('auth');
      req.session.destroy(function() {});
    }
    res.redirect('/');
  });
  return router;
}

module.exports = authRoutes;
