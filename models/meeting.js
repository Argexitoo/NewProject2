const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  hour: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  usersJoined: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
