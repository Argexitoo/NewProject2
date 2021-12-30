const isLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/log-in');
  }
  next();
};

module.exports = isLoggedIn;
