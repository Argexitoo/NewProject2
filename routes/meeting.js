const express = require('express');
const Dog = require('../models/dog');
const User = require('../models/user');
const Meeting = require('../models/meeting');
const isLoggedIn = require('../middlewares');

function meetingRoutes() {
  const router = express.Router();

  router.get('/mymeetings', async (req, res, next) => {
    const userId = req.session.currentUser._id;
    try {
      const foundMeetings = await Meeting.find({ owner: userId });
      res.render('./meeting/mymeetings', { foundMeetings });
    } catch (e) {
      next(e);
    }
  });

  router.get('/profile-newmeeting', async (req, res, next) => {
    try {
      res.render('./meeting/profile-newmeeting');
    } catch (e) {
      next(e);
    }
  });

  router.post('/profile-newmeeting', async (req, res, next) => {
    const userId = req.session.currentUser._id;
    const { name, location, date, hour, description } = req.body;
    try {
      if (!name || !location || !date || !hour || !description) {
        return res.render('./meeting/profile-newmeeting', {
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
      res.render('./meeting/update-form-meeting', { id, editMeeting });
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
      res.render('./meeting/allmeetings', { foundMeetings });
    } catch (e) {
      next(e);
    }
  });

  router.get('/meeting/:id', async (req, res, next) => {
    const { id } = req.params;
    const user = req.session.currentUser;
    try {
      const meeting = await Meeting.findById(id);
      res.render('./meeting/meeting', { meeting, owner: user });
    } catch (e) {
      next(e);
    }
  });

  // TRIAL
  router.post('/meeting/:id/join', async (req, res, next) => {
    const user = req.session.currentUser;
    const { id } = req.params;
    try {
      const joinMeeting = await Meeting.findById(id);
      joinMeeting.usersJoined.push(user._id);
      joinMeeting.save();
      return res.redirect('/mymeetings');
    } catch (e) {
      next(e);
    }
  });

  // TRIAL
  router.get('/joinedmeetings', async (req, res, next) => {
    const user = req.session.currentUser;
    try {
      const allmeetings = await Meeting.find({}).populate('usersJoined');
      const mymeetings = allmeetings.map(meeting => meeting.usersJoined.includes(user._id));
      return res.redirect('/mymeetings');
    } catch (e) {
      next(e);
    }
  });

  return router;
}

module.exports = meetingRoutes;
