const express = require('express');

function baseRoutes() {
  const router = express.Router();

  router.get('/', async (req, res, next) => {
    const user = req.session.currentUser;
    try {
      res.render('index.hbs', { name: user ? user.email : 'Anonimo' });
    } catch (e) {
      next(e);
    }
  });

  return router;
}

module.exports = baseRoutes;
