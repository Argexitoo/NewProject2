const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  race: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
   age: {
    type: Number,
    required: true,
  },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User'}
});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;