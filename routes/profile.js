const express = require('express');
const Dog = require('../models/dog');
const User = require('../models/user');
const Meeting = require('../models/meeting');

function profileRoutes() {
  const router = express.Router();

  router.get('/mydogs', async (req, res, next) => {
    const userId = req.session.currentUser._id;
    try {
      const foundDogs = await Dog.find({ owner: userId });
      res.render('./profile/mydogs', { foundDogs });
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
      if (!name || !sex || !race || !size || !age) {
        return res.render('./profile/profile-newdog', {
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
      res.render('./profile/update-form', { id, editDog });
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

  router.get('/profile', async (req, res, next) => {
    const user = req.session.currentUser;
    try {
      const foundDogs = await Dog.find({ owner: user._id });
      res.render('./profile/profile', { user, foundDogs });
    } catch (e) {
      next(e);
    }
  });

  router.get('/profile/:id/edit', async (req, res, next) => {
    const user = req.session.currentUser._id;
    try {
      const editUser = await User.findById(user);
      res.render('./profile/update-form-user', { user, editUser });
    } catch (e) {
      next(e);
    }
  });

  router.post('/profile/:id/edit', async (req, res, next) => {
    const user = req.session.currentUser._id;
    const { email, password, nickname, name, location, age } = req.body;
    try {
      const editUser = await User.findByIdAndUpdate(
        user,
        { email, password, nickname, name, location, age },
        { new: true },
      );
      return res.redirect('/profile');
    } catch (e) {
      next(e);
    }
  });

  //

  router.get('/mymeetings', async (req, res, next) => {
    const userId = req.session.currentUser._id;
    try {
      const foundMeetings = await Meeting.find({ owner: userId });
      res.render('./profile/mymeetings', { foundMeetings });
    } catch (e) {
      next(e);
    }
  });

  router.get('/profile-newmeeting', async (req, res, next) => {
    try {
      res.render('./profile/profile-newmeeting');
    } catch (e) {
      next(e);
    }
  });

  router.post('/profile-newmeeting', async (req, res, next) => {
    const userId = req.session.currentUser._id;
    const { name, location, date, hour, description } = req.body;
    try {
      if (!name || !location || !date || !hour || !description) {
        return res.render('./profile/profile-newmeeting', {
          errorMessage: 'Complete all fields',
        });
      }
      const meeting = await Meeting.create({ name, location, date, hour, description, owner: userId });
      res.redirect('/mymeetings');
    } catch (e) {
      next(e);
    }
  });

  router.get('/profile-mymeeting/:id/edit', async (req, res, next) => {
    const { id } = req.params;
    try {
      const editMeeting = await Meeting.findById(id);
      res.render('./profile/update-form-meeting', { id, editMeeting });
    } catch (e) {
      next(e);
    }
  });

  router.post('/profile-mymeeting/:id/edit', async (req, res, next) => {
    const { id } = req.params;
    const { name, location, date, hour, description } = req.body;
    try {
      const editMeeting = await Meeting.findByIdAndUpdate(
        id,
        { name, location, date, hour, description },
        { new: true },
      );
      return res.redirect('/mymeetings');
    } catch (e) {
      next(e);
    }
  });

  router.get('/profile-mymeeting/:id/delete', async (req, res, next) => {
    const { id } = req.params;
    try {
      const deleteMeeting = await Meeting.findByIdAndDelete(id);
      res.redirect('/mymeetings');
    } catch (e) {
      next(e);
    }
  });

  router.get('/allmeetings', async (req, res, next) => {
    const { id } = req.params;
    try {
      const foundMeetings = await Meeting.find();
      res.render('./profile/allmeetings', { foundMeetings });
    } catch (e) {
      next(e);
    }
  });

  router.get('/meeting/:id', async (req, res, next) => {
    const { id } = req.params;
    const userId = req.session.currentUser._id;
    try {
      const meeting = await Meeting.findById(id);
      res.render('./profile/meeting', { meeting });
    } catch (e) {
      next(e);
    }
  });

  return router;
}

module.exports = profileRoutes;
