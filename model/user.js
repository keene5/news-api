const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // To generate a unique API key

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: false,
  }

  });

  module.exports = mongoose.model('User', userSchema, 'users');