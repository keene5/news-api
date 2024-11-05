const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // To generate a unique API key

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: false,
  },
  accessLevel: {
    type: String,
    enum: ['read', 'write', 'admin'],
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);