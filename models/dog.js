const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
    enum: ['Female', 'Male'],
  },
  race: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
    enum: ['Small', 'Medium', 'Large', 'Giant'],
  },
  age: {
    type: String,
    required: true,
    enum: [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
    ],
  },
  image: { type: String },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;
